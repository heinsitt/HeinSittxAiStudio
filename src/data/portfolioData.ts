export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'infra' | 'frontend' | '3d';
  categoryLabel: string;
  description: string;
  longDescription?: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  tags: string[];
  metrics?: string[];
  isCaseStudy?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'cloud' | 'devops' | 'linux' | 'language';
  image: string;
  verifyUrl?: string;
  credentialId?: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  badge: string;
  summary: string;
  highlights: string[];
  tools: string[];
  slaMetrics?: { label: string; value: string }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Hein Sitt Tun',
    headline: 'Associate DevOps Engineer & Senior NOC Specialist',
    location: 'Yangon, Myanmar (Open to Remote / Relocation)',
    email: 'heinsitttun2002@gmail.com',
    phones: ['+95 995 020 2656', '+95 967 013 2436'],
    github: 'https://github.com/heinsitt',
    linkedin: 'https://www.linkedin.com/in/heinsitttun/',
    resumePdf: '/assets/aistudio/resume_e161ccae.pdf',
    photo: '/assets/aistudio/profile_06a1d5b4.jpg',
    devopsIcon: '/assets/aistudio/devops-icon_bf2755c3.png',
    bio: 'Results-driven Infrastructure & Operations Engineer with hands-on experience in 24/7 enterprise monitoring, incident triage, and cloud infrastructure oversight at WaveMoney HQ site. Proficient in Linux system administration (Rocky Linux, Ubuntu, RHEL), Docker containerization, CI/CD automation, and multi-cloud environments (AWS & Azure). Passionate about automating deployment workflows, improving system reliability, and building resilient cloud architectures.',
    status: 'SYSTEM HEALTH: 99.99% // READY FOR DEPLOYMENT',
    stats: [
      { label: 'Uptime SLA Monitored', value: '99.99%', sub: 'WaveMoney HQ 24/7' },
      { label: 'Incident Triage Time', value: '< 5 min', sub: 'Critical Alert SLA' },
      { label: 'Verified Certifications', value: '11+', sub: 'AWS, Azure, K8s, SRE' },
      { label: 'Cloud & System Labs', value: '10+', sub: 'Docker, Grafana, CI/CD' }
    ]
  },

  experiences: [
    {
      id: 'bim-wavemoney',
      role: 'Senior NOC Engineer (WaveMoney HQ Site)',
      company: 'BIM Group of Companies',
      location: 'Yangon, Myanmar',
      period: 'May 2025 – Present',
      type: 'Full-time Enterprise Operations',
      badge: 'ACTIVE 24/7 OVERSIGHT',
      summary: 'Managing enterprise-level 24/7 real-time monitoring and incident response for WaveMoney—one of Myanmar’s largest mobile financial services platforms. Collaborating directly with SRE, DevOps, and Database Engineering teams to ensure peak availability and zero downtime.',
      highlights: [
        'Proactive Monitoring: Executed 24/7 real-time observability of core financial transaction pipelines and network stability using Datadog and Zabbix.',
        'Incident Management: Identified and triaged critical P1/P2 alerts, leading rapid cross-functional resolution to mitigate downtime and customer impact.',
        'Cloud Health Oversight: Leveraged AWS CloudWatch to audit cloud EC2/S3 resources, database throughput, and application health metrics.',
        'Analysis & Reporting: Cataloged detailed incident timelines and analyzed root causes to deliver actionable remediation blueprints.',
        'Stakeholder Coordination: Spearheaded transparent incident communication and planned maintenance notifications to financial partners and banking gateways.',
        'Cross-Team Synergy: Collaborated closely with WaveMoney SREs, DevOps engineers, and DBA leads to harden failover resilience.'
      ],
      tools: ['Datadog', 'Zabbix', 'AWS CloudWatch', 'EC2 / S3', 'Linux RHEL', 'PagerDuty', 'Grafana'],
      slaMetrics: [
        { label: 'Alert Detection', value: '< 60s' },
        { label: 'Resolution Rate', value: '99.4%' },
        { label: 'Availability', value: '99.99%' }
      ]
    },
    {
      id: 'ngo-it-support',
      role: 'IT Support Engineer',
      company: 'Non-Governmental Organization (NGO)',
      location: 'Yangon, Myanmar',
      period: 'May 2024 – Dec 2024',
      type: 'Technical Operations',
      badge: 'FIELD INFRASTRUCTURE',
      summary: 'Delivered reliable IT systems and field communication infrastructure for humanitarian aid teams, maintaining network security and user workstations.',
      highlights: [
        'Managed system deployments, OS installations, patch rollouts, and endpoint configuration across office and remote field locations.',
        'Provided essential technical support, network troubleshooting, and equipment maintenance to 50+ humanitarian staff members.',
        'Diagnosed and resolved hardware, software, VPN, and LAN/WAN connectivity issues under tight time constraints.'
      ],
      tools: ['Windows / Linux', 'Network Essentials', 'VPN', 'Hardware Diagnostics', 'Remote Desktop']
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: 'Diploma in Information Technology (A.G.T.I)',
      institution: 'Government Technical Institute (G.T.I - Insein)',
      period: 'Graduated',
      specialization: 'C#, C++, Web Development, Network Essentials & Data Communications',
      description: 'Comprehensive engineering foundation in algorithmic computation, computer networks, and system architecture.'
    },
    {
      degree: 'Bachelor of Science (B.Sc) — Applied Mathematics',
      institution: 'Dagon University',
      period: 'Completed',
      specialization: 'Applied Mathematics, Numerical Methods & Statistical Analysis',
      description: 'Strong mathematical discipline applied to infrastructure capacity planning, queueing theory, and cloud performance modeling.'
    }
  ],

  projects: [
    {
      id: 'infra-monitoring-lab',
      title: 'Enterprise Infra Monitoring Lab',
      subtitle: 'Full-Stack Observability Pipeline with Zabbix & Grafana',
      category: 'infra',
      categoryLabel: 'DevOps & Observability',
      description: 'Hybrid WordPress and containerized microservice infrastructure monitored with enterprise Zabbix and Grafana dashboards for live metric telemetry.',
      longDescription: 'Architected a multi-container Docker deployment with automated service pings, disk I/O monitoring, Linux memory saturation tracking, and network interface throughput alerts. Configured custom Grafana panels displaying real-time Apache response times and host health.',
      image: '/assets/aistudio/lab-grafana_3a41ede9.jpg',
      liveUrl: 'https://heinsitt.github.io/Infra-lab-series-00/',
      githubUrl: 'https://github.com/heinsitt',
      tags: ['Docker', 'Zabbix', 'Grafana', 'Linux', 'Apache', 'Observability'],
      metrics: ['24/7 Live Telemetry', 'Dockerized Agents', 'Custom Grafana Dashboards'],
      isCaseStudy: true
    },
    {
      id: 'isometric-mini-world',
      title: 'Isometric 3D Miniworld',
      subtitle: 'Interactive Architectural WebGL Prototyping Lab',
      category: '3d',
      categoryLabel: 'WebGL & 3D Lab',
      description: 'Playful isometric 3D architectural scene with dynamic lighting, interactive camera orbit controls, and custom procedural models.',
      longDescription: 'Engineered with Three.js and WebGL shaders, focusing on isometric matrix projections, geometric lighting passes, and low-latency interaction.',
      image: 'https://base44.app/api/apps/6a85ba7b0c8ac01d6f0588ea/files/mp/public/6a85ba7b0c8ac01d6f0588ea/1e3df2a35_isometric.jpg',
      liveUrl: 'https://isometric-mini-world.vercel.app/',
      tags: ['Three.js', 'WebGL', 'Isometric Math', 'Shader Effects'],
      metrics: ['60 FPS Rendering', 'Procedural Lighting']
    },
    {
      id: 'solar-system-3d',
      title: '3D Solar System Simulation',
      subtitle: 'Celestial Kinematics & Orbital Physics Lab',
      category: '3d',
      categoryLabel: 'WebGL & Simulation',
      description: 'Physics-accurate orbital mechanics, real-time lighting calculations, and scale-accurate celestial rendering in-browser.',
      longDescription: 'Built utilizing mathematical astrophysics formulas, custom textures, orbital speed multipliers, and dynamic distance scaling.',
      image: 'https://base44.app/api/apps/6a85ba7b0c8ac01d6f0588ea/files/mp/public/6a85ba7b0c8ac01d6f0588ea/e6d43cc9d_solar-system.jpg',
      liveUrl: 'https://solar-system-3d-mu.vercel.app/',
      tags: ['Three.js', 'Astrophysics', 'Orbital Math', 'WebGL'],
      metrics: ['Keplerian Orbits', 'Multi-layer Atmosphere']
    },
    {
      id: 'heino-xide',
      title: 'Heino Xide — Brand Platform',
      subtitle: 'Cinematic Visual Identity & Media Landing Experience',
      category: 'frontend',
      categoryLabel: 'Frontend Engineering',
      description: 'Dark-atmosphere, bold typography branding platform for a nature and drone videography brand with high-performance responsive styling.',
      longDescription: 'Built with modern React and Tailwind CSS, featuring dark-mode contrast theory, micro-interactions, responsive media grids, and optimized asset delivery.',
      image: 'https://base44.app/api/apps/6a85ba7b0c8ac01d6f0588ea/files/mp/public/6a85ba7b0c8ac01d6f0588ea/2fbbaea1e_heinoxide.jpg',
      liveUrl: 'https://heinoxide.vercel.app/',
      tags: ['React', 'Tailwind CSS', 'Branding', 'Media Optimization'],
      metrics: ['Lighthouse 98+', 'Fluid Typography']
    },
    {
      id: 'labpins-organics',
      title: 'LabPins Organics Storefront',
      subtitle: 'Sustainable E-Commerce Digital Experience',
      category: 'frontend',
      categoryLabel: 'E-Commerce',
      description: 'Clean, product-first e-commerce experience for an organic farm brand with streamlined catalog navigation and order flow.',
      image: 'https://base44.app/api/apps/6a85ba7b0c8ac01d6f0588ea/files/mp/public/6a85ba7b0c8ac01d6f0588ea/bf59c3c52_labpins.jpg',
      liveUrl: 'https://labpins-organics.vercel.app/',
      tags: ['E-Commerce', 'Responsive Design', 'Catalog Architecture'],
      metrics: ['Instant Filter UX', 'Mobile First']
    }
  ] as Project[],

  certifications: [
    {
      id: 'cert-aws100',
      title: '100 Days of Cloud (AWS)',
      issuer: 'KodeKloud',
      issueDate: 'Jan 17, 2026',
      category: 'cloud',
      image: '/assets/aistudio/cert-aws100days_9035fa6e.jpg',
      description: 'Comprehensive 100-day hands-on challenge covering AWS EC2, S3, IAM policies, VPC networking, CloudWatch, and multi-tier cloud architectures.',
      skills: ['AWS EC2', 'VPC', 'S3', 'IAM', 'CloudWatch', 'ALB']
    },
    {
      id: 'cert-azure100',
      title: '100 Days of Cloud (Azure)',
      issuer: 'KodeKloud',
      issueDate: 'Jan 30, 2026',
      category: 'cloud',
      image: '/assets/aistudio/cert-azure100days_a5a6113c.jpg',
      description: 'Rigorous 100-day cloud engineering program covering Azure Resource Groups, Virtual Machines, Virtual Networks, Blob Storage, and Azure Monitor.',
      skills: ['Azure VMs', 'VNet', 'Blob Storage', 'Azure Monitor', 'Resource Groups']
    },
    {
      id: 'cert-devops100',
      title: '100 Days of DevOps',
      issuer: 'KodeKloud',
      issueDate: 'Jun 17, 2026',
      category: 'devops',
      image: '/assets/aistudio/cert-devops100days_b8158031.jpg',
      description: 'Intensive practical program executing automated CI/CD pipelines, container orchestration, configuration management, and Infrastructure as Code.',
      skills: ['CI/CD Pipelines', 'Docker', 'Automation', 'IaC', 'GitOps']
    },
    {
      id: 'cert-k8s',
      title: 'Kubernetes — Level 1',
      issuer: 'KodeKloud Engineer',
      issueDate: 'May 13, 2026',
      category: 'devops',
      image: '/assets/aistudio/cert-kubernetes-l1_7955dc59.jpg',
      credentialId: 'Eb60f3c2-Fddd-46eb-8235-Db4c9137f1e0',
      description: 'Orchestration fundamentals: Pod scheduling, Deployments, ReplicaSets, ClusterIP & NodePort Services, ConfigMaps, Secrets, and Namespace administration.',
      skills: ['Kubernetes', 'Pods', 'Deployments', 'Services', 'ConfigMaps', 'Cluster Management']
    },
    {
      id: 'cert-docker',
      title: 'Docker — Level 1',
      issuer: 'KodeKloud Engineer',
      issueDate: 'Apr 20, 2026',
      category: 'devops',
      image: '/assets/aistudio/cert-docker-l1_4aeb08d1.jpg',
      credentialId: '5af66258-E3c6-4b83-9024-F0d0282f0e8d',
      description: 'Containerization deep-dive: Multi-stage Dockerfiles, image optimization, volume persistent storage, bridge networks, and Docker Compose orchestration.',
      skills: ['Docker', 'Multi-stage Builds', 'Docker Compose', 'Container Networking', 'Volumes']
    },
    {
      id: 'cert-jenkins',
      title: 'Jenkins — Level 1',
      issuer: 'KodeKloud Engineer',
      issueDate: 'May 22, 2026',
      category: 'devops',
      image: '/assets/aistudio/cert-jenkins-l1_699d7816.jpg',
      credentialId: '705d464c-8c9f-4e9b-Bb5e-D26b07ef2e26',
      description: 'Continuous Integration with Jenkins: Declarative & Scripted Jenkinsfile authoring, automated build triggers, artifact archiving, and deployment gates.',
      skills: ['Jenkins', 'CI/CD Pipelines', 'Jenkinsfile', 'Build Automation', 'Git Integration']
    },
    {
      id: 'cert-git',
      title: 'Git — Level 1',
      issuer: 'KodeKloud Engineer',
      issueDate: 'Apr 20, 2026',
      category: 'devops',
      image: '/assets/aistudio/cert-git-l1_ec0fe2d7.jpg',
      credentialId: '262c61d7-Ecd0-4ba9-96fe-Cb407a4436cc',
      description: 'Enterprise version control: Gitflow branching strategies, interactive rebasing, merge conflict resolution, cherry-picking, and remote repository governance.',
      skills: ['Git', 'Branching Strategy', 'Rebase', 'Pull Requests', 'Gitflow']
    },
    {
      id: 'cert-linux',
      title: 'Linux Special Class (System Administration)',
      issuer: 'BNN Tech Training Center',
      issueDate: 'Feb 1, 2026',
      category: 'linux',
      image: '/assets/aistudio/cert-linux-special_924d3dcb.jpg',
      description: 'Comprehensive system administration across Debian, Ubuntu, RHEL 9, CentOS 9, and RockyLinux 9: kernel parameters, systemd, networking, troubleshooting.',
      skills: ['RHEL 9', 'Rocky Linux', 'Ubuntu', 'systemd', 'Linux Troubleshooting', 'Storage / LVM']
    },
    {
      id: 'cert-sre',
      title: 'Fundamentals of SRE (Site Reliability Engineering)',
      issuer: 'KodeKloud',
      issueDate: 'Feb 15, 2026',
      category: 'devops',
      image: '/assets/aistudio/cert-sre-fundamentals_b42f36da.png',
      credentialId: 'ae3ce499-9bf4-4441-986d-7196d89ee273',
      description: 'Site Reliability Engineering principles: Defining Service Level Indicators (SLIs), Service Level Objectives (SLOs), error budgets, incident postmortems.',
      skills: ['SLIs / SLOs', 'Error Budgets', 'Incident Response', 'Monitoring', 'Reliability Engineering']
    },
    {
      id: 'cert-cloudtech',
      title: 'Cloud Technology Fundamentals',
      issuer: 'CCNA VCE Training Centre',
      issueDate: 'Oct 2025',
      category: 'cloud',
      image: '/assets/aistudio/cert-cloudtech-fundamental_3f5794d9.png',
      credentialId: 'VCE010048',
      description: 'Core cloud computing architectures, virtualization abstractions, cloud storage paradigms, security boundaries, and high availability design.',
      skills: ['Cloud Architecture', 'Networking', 'Virtualization', 'Compute Fundamentals']
    },
    {
      id: 'cert-efset',
      title: 'EF-Set English Proficiency (C1 Advanced)',
      issuer: 'EF Standard English Test',
      issueDate: 'Verified',
      category: 'language',
      image: '/assets/aistudio/cert-efset_1d171dff.png',
      verifyUrl: 'https://cert.efset.org/atXv61',
      description: 'Score: 69/100 (C1 Advanced level). Certified fluency for international distributed engineering teams, incident bridges, and technical documentation.',
      skills: ['Technical Documentation', 'Incident Communication', 'C1 Advanced English']
    }
  ] as Certification[],

  techStack: [
    { name: 'AWS', category: 'Cloud Infrastructure', level: 'Intermediate', icon: 'aws', desc: 'EC2, S3, CloudWatch, VPC, IAM, Route53' },
    { name: 'Azure', category: 'Cloud Infrastructure', level: 'Fundamentals', icon: 'azure', desc: 'Azure VMs, Resource Groups, Blob Storage, VNet' },
    { name: 'Docker', category: 'Containers & Microservices', level: 'Proficient', icon: 'docker', desc: 'Container builds, Docker Compose, Volume persistence' },
    { name: 'Kubernetes', category: 'Containers & Microservices', level: 'Intermediate', icon: 'k8s', desc: 'Pods, Deployments, Services, ConfigMaps, RKE2' },
    { name: 'Linux', category: 'OS & Kernel', level: 'Advanced', icon: 'linux', desc: 'Rocky Linux, Ubuntu, RHEL 9, Bash scripting, systemd' },
    { name: 'Datadog', category: 'Monitoring & Observability', level: 'Advanced', icon: 'datadog', desc: '24/7 Enterprise APM, Dashboards, Monitors & Alerting' },
    { name: 'Zabbix', category: 'Monitoring & Observability', level: 'Advanced', icon: 'zabbix', desc: 'Host discovery, SNMP, agent telemetry, SLA tracking' },
    { name: 'Grafana', category: 'Monitoring & Observability', level: 'Proficient', icon: 'grafana', desc: 'Time-series visualization, Prometheus queries, custom panels' },
    { name: 'Prometheus', category: 'Monitoring & Observability', level: 'Intermediate', icon: 'prometheus', desc: 'Metrics scraping, PromQL, Alertmanager rules' },
    { name: 'Jenkins', category: 'CI/CD & Automation', level: 'Intermediate', icon: 'jenkins', desc: 'Jenkinsfile pipelines, automated build triggers, testing' },
    { name: 'Git & GitHub', category: 'Version Control', level: 'Advanced', icon: 'git', desc: 'Gitflow, branch protections, pull request governance' },
    { name: 'Terraform', category: 'Infrastructure as Code', level: 'Fundamentals', icon: 'terraform', desc: 'HCL declarative configuration, state management, modules' },
    { name: 'Ansible', category: 'Configuration Management', level: 'Basic', icon: 'ansible', desc: 'Playbooks, automated provisioning, host inventory' },
    { name: 'AI Workflows', category: 'Engineering Acceleration', level: 'Expert', icon: 'ai', desc: 'Cursor, Claude, AntiGravity, Kimi, agentic coding' }
  ]
};
