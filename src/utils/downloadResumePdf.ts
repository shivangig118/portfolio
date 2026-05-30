import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 12;
const CAPTURE_WIDTH_PX = 794;

function prepareCaptureTarget(source: HTMLElement): { target: HTMLElement; cleanup: () => void } {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.style.cssText =
    'position:fixed;left:-10000px;top:0;z-index:-1;width:' +
    CAPTURE_WIDTH_PX +
    'px;background:#fff;pointer-events:none;';

  const clone = source.cloneNode(true) as HTMLElement;
  clone.style.overflow = 'visible';
  clone.style.maxHeight = 'none';
  clone.style.height = 'auto';
  clone.style.width = `${CAPTURE_WIDTH_PX}px`;
  clone.style.flex = 'none';

  clone.querySelectorAll<HTMLElement>('*').forEach((el) => {
    el.style.overflow = 'visible';
    el.style.maxHeight = 'none';
  });

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  return {
    target: clone,
    cleanup: () => wrapper.remove(),
  };
}

export async function generateResumePdfBlob(source: HTMLElement): Promise<Blob> {
  await document.fonts.ready;

  const { target, cleanup } = prepareCaptureTarget(source);

  try {
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: target.scrollWidth,
      height: target.scrollHeight,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight,
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Resume capture produced an empty image.');
    }

    const contentWidthMm = A4_WIDTH_MM - MARGIN_MM * 2;
    const contentHeightMm = A4_HEIGHT_MM - MARGIN_MM * 2;

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const imgWidthMm = contentWidthMm;
    const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let heightLeft = imgHeightMm;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM, imgWidthMm, imgHeightMm);
    heightLeft -= contentHeightMm;

    while (heightLeft > 0) {
      position = heightLeft - imgHeightMm;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM + position, imgWidthMm, imgHeightMm);
      heightLeft -= contentHeightMm;
    }

    return pdf.output('blob');
  } finally {
    cleanup();
  }
}

export async function downloadResumePdf(
  source: HTMLElement,
  filename = 'Shivangi_Goyal_Resume.pdf'
): Promise<void> {
  const blob = await generateResumePdfBlob(source);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
