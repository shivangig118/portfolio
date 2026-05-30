declare var angular: any;

import { EXPERIENCES, PROJECTS, SKILLS } from './data';
import { Project, ExperienceItem, SkillGroup } from './types';

// Define the AngularJS Application Module
const app = angular.module('portfolioApp', []);

// Create a Custom Directive for Lucide Icons
app.directive('lucideIcon', ['$timeout', function($timeout: any) {
  return {
    restrict: 'E',
    scope: {
      name: '@',
      class: '@'
    },
    link: function(scope: any, element: any) {
      const updateIcon = () => {
        const iconName = scope.name;
        if (!iconName) return;

        const iconEl = document.createElement('i');
        iconEl.setAttribute('data-lucide', iconName);
        if (scope.class) {
          iconEl.className = scope.class;
        }

        element.empty();
        element.append(iconEl);

        // Ensure lucide compiles the icon
        // @ts-ignore
        if (window.lucide) {
          // @ts-ignore
          window.lucide.createIcons();
        }
      };

      scope.$watch('name', updateIcon);
      scope.$watch('class', updateIcon);

      $timeout(updateIcon, 50);
    }
  };
}]);

// Define the Portfolio Controller
app.controller('PortfolioController', ['$scope', '$timeout', '$window', function($scope: any, $timeout: any, $window: any) {
  const vm = this;

  // Header State
  vm.scrolled = false;
  vm.mobileMenuOpen = false;

  // Manage Scroll Effect for sticky Header
  $window.addEventListener('scroll', () => {
    $scope.$apply(() => {
      vm.scrolled = $window.scrollY > 10;
    });
  });

  // Navigation Links
  vm.navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  // Dynamic Badges
  vm.badges = [
    { text: 'Fresher SDE', icon: 'terminal' },
    { text: 'Full Stack', icon: 'code' },
    { text: 'AI Enthusiast', icon: 'sparkles' },
    { text: 'Based in Bangalore', icon: 'map-pin' }
  ];

  // Static Data
  vm.skills = SKILLS;
  vm.experiences = EXPERIENCES;
  vm.projects = PROJECTS;

  // Modal States
  vm.selectedProject = null as Project | null;
  vm.isProjectModalOpen = false;
  vm.projectActiveTab = 'details'; // 'details' | 'demo'

  vm.isResumeModalOpen = false;
  vm.isEmailFormOpen = false;

  // Project Sandbox Demo States
  vm.sandboxInputText = '';
  vm.sandboxSummaryOutput = [] as string[];
  vm.sandboxIsProcessing = false;
  vm.sandboxChartData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20);

  // Email form fields
  vm.emailForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  vm.emailErrors = {} as { [key: string]: string };
  vm.emailIsSubmitting = false;
  vm.emailIsSuccess = false;

  // Toggle Navbar menu
  vm.toggleMobileMenu = function() {
    vm.mobileMenuOpen = !vm.mobileMenuOpen;
  };

  // Open Project Details Modal
  vm.openProjectDetails = function(project: Project) {
    vm.selectedProject = project;
    vm.projectActiveTab = 'details';
    vm.isProjectModalOpen = true;

    // Reset sandbox states
    vm.sandboxInputText = '';
    vm.sandboxSummaryOutput = [];
    vm.sandboxIsProcessing = false;

    if (project.id === 'proj2') {
      vm.startTelemetrySimulation();
    }
  };

  // Close Project Details Modal
  vm.closeProjectDetails = function() {
    vm.isProjectModalOpen = false;
    vm.selectedProject = null;
    vm.stopTelemetrySimulation();
  };

  // Switch Project Tab
  vm.setProjectTab = function(tab: 'details' | 'demo') {
    vm.projectActiveTab = tab;
  };

  // Live telemetry timer reference
  let telemetryInterval: any = null;

  vm.startTelemetrySimulation = function() {
    vm.stopTelemetrySimulation();
    telemetryInterval = setInterval(() => {
      $scope.$apply(() => {
        const next = [...vm.sandboxChartData.slice(1)];
        next.push(Math.floor(Math.random() * 70) + 15);
        vm.sandboxChartData = next;
      });
    }, 1200);
  };

  vm.stopTelemetrySimulation = function() {
    if (telemetryInterval) {
      clearInterval(telemetryInterval);
      telemetryInterval = null;
    }
  };

  // Live Summarize Demo Action
  vm.handleSummarize = function() {
    if (!vm.sandboxInputText.trim()) return;
    vm.sandboxIsProcessing = true;

    $timeout(() => {
      const sentences = vm.sandboxInputText.split(/[.!?]+/).map((s: string) => s.trim()).filter(Boolean);
      let summaryArr: string[] = [];

      if (sentences.length <= 2) {
        summaryArr = [
          `Core Takeaway: "${sentences[0] || 'Specified document information'}."`,
          'Insights suggest continuous active scaling fits modern development criteria.'
        ];
      } else {
        summaryArr = [
          `Identified central topic: "${sentences[0]}."`,
          `Highlighting: "${sentences[Math.floor(sentences.length / 2)] || 'System optimizations'}."`,
          `Actionable output: "${sentences[sentences.length - 1]}."`
        ];
      }

      vm.sandboxSummaryOutput = summaryArr;
      vm.sandboxIsProcessing = false;
    }, 1000);
  };

  // Open Resume Modal
  vm.openResume = function() {
    vm.isResumeModalOpen = true;
  };

  vm.closeResume = function() {
    vm.isResumeModalOpen = false;
  };

  vm.printResume = function() {
    $window.print();
  };

  // Open Email Connection Modal
  vm.openEmailForm = function() {
    vm.emailForm = { name: '', email: '', subject: '', message: '' };
    vm.emailErrors = {};
    vm.emailIsSubmitting = false;
    vm.emailIsSuccess = false;
    vm.isEmailFormOpen = true;
  };

  vm.closeEmailForm = function() {
    vm.isEmailFormOpen = false;
  };

  // Submit Contact Email
  vm.submitEmailForm = function() {
    const errs: { [key: string]: string } = {};
    if (!vm.emailForm.name.trim()) errs.name = 'Name is required';
    if (!vm.emailForm.email.trim()) {
      errs.email = 'Email connection is required';
    } else if (!/\S+@\S+\.\S+/.test(vm.emailForm.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!vm.emailForm.message.trim()) errs.message = 'Please write a brief greeting message';

    vm.emailErrors = errs;
    if (Object.keys(errs).length > 0) return;

    vm.emailIsSubmitting = true;
    $timeout(() => {
      vm.emailIsSubmitting = false;
      vm.emailIsSuccess = true;
    }, 1400);
  };
}]);
