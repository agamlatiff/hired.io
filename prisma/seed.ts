import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting fresh database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.applicant.deleteMany();
  await prisma.jobView.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.job.deleteMany();
  await prisma.companyOverview.deleteMany();
  await prisma.companySocialMedia.deleteMany();
  await prisma.companyTeam.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.categoryJob.deleteMany();
  await prisma.industry.deleteMany();

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  // ============================================
  // CATEGORIES
  // ============================================
  console.log('📁 Creating job categories...');
  const categories = [
    { id: 'software-engineering', name: 'Software Engineering' },
    { id: 'product-design', name: 'Product & Design' },
    { id: 'data-analytics', name: 'Data & Analytics' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'operations', name: 'Operations' },
    { id: 'sales', name: 'Sales' },
    { id: 'customer-support', name: 'Customer Support' },
    { id: 'human-resources', name: 'Human Resources' },
    { id: 'finance', name: 'Finance' },
  ];

  for (const cat of categories) {
    await prisma.categoryJob.create({ data: cat });
  }

  // ============================================
  // INDUSTRIES
  // ============================================
  console.log('🏭 Creating industries...');
  const industries = [
    { id: 'technology', name: 'Technology' },
    { id: 'fintech', name: 'Fintech' },
    { id: 'e-commerce', name: 'E-commerce' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'education', name: 'Education' },
    { id: 'logistics', name: 'Logistics' },
  ];

  for (const ind of industries) {
    await prisma.industry.create({ data: ind });
  }

  // ============================================
  // 3 COMPANIES
  // ============================================
  console.log('🏢 Creating 3 companies...');

  // Company 1: GojekTech (Tech/Fintech)
  const gojektech = await prisma.company.create({
    data: {
      name: 'GojekTech Indonesia',
      email: 'hr@gojektech.co.id',
      password: adminPassword,
      logo: '/images/company.png',
      plan: 'premium',
    },
  });

  await prisma.companyOverview.create({
    data: {
      name: 'GojekTech Indonesia',
      image: '/images/company.png',
      website: 'https://gojektech.co.id',
      location: 'Jakarta, Indonesia',
      employee: '500-1000',
      industry: 'Technology',
      dateFounded: new Date('2015-06-15'),
      techStack: ['Go', 'Kotlin', 'React', 'PostgreSQL', 'Kubernetes'],
      description: 'GojekTech adalah perusahaan teknologi terdepan yang fokus pada solusi super-app untuk Asia Tenggara. Kami membangun produk yang digunakan jutaan orang setiap hari.',
      companyId: gojektech.id,
    },
  });

  await prisma.companySocialMedia.create({
    data: {
      instagram: 'https://instagram.com/gojektech',
      twitter: 'https://twitter.com/gojektech',
      facebook: 'https://facebook.com/gojektech',
      linkedin: 'https://linkedin.com/company/gojektech',
      youtube: 'https://youtube.com/@gojektech',
      companyId: gojektech.id,
    },
  });

  // Company 2: Tokopedia Digital
  const tokped = await prisma.company.create({
    data: {
      name: 'Tokopedia Digital',
      email: 'careers@tokopedia.com',
      password: hashedPassword,
      logo: '/images/company2.png',
      plan: 'premium',
    },
  });

  await prisma.companyOverview.create({
    data: {
      name: 'Tokopedia Digital',
      image: '/images/company2.png',
      website: 'https://tokopedia.com',
      location: 'Jakarta Selatan, Indonesia',
      employee: '1000+',
      industry: 'E-commerce',
      dateFounded: new Date('2009-08-17'),
      techStack: ['Java', 'Python', 'React', 'MySQL', 'Redis', 'Elasticsearch'],
      description: 'Tokopedia adalah marketplace terbesar di Indonesia yang menghubungkan jutaan penjual dan pembeli. Misi kami adalah menciptakan ekonomi digital yang inklusif.',
      companyId: tokped.id,
    },
  });

  await prisma.companySocialMedia.create({
    data: {
      instagram: 'https://instagram.com/tokopedia',
      twitter: 'https://twitter.com/tokopedia',
      facebook: 'https://facebook.com/tokopedia',
      linkedin: 'https://linkedin.com/company/tokopedia',
      youtube: 'https://youtube.com/@tokopedia',
      companyId: tokped.id,
    },
  });

  // Company 3: Ruangguru Edutech
  const ruangguru = await prisma.company.create({
    data: {
      name: 'Ruangguru Edutech',
      email: 'talent@ruangguru.com',
      password: hashedPassword,
      logo: '/images/logo.png',
      plan: 'standard',
    },
  });

  await prisma.companyOverview.create({
    data: {
      name: 'Ruangguru Edutech',
      image: '/images/logo.png',
      website: 'https://ruangguru.com',
      location: 'Jakarta, Indonesia',
      employee: '200-500',
      industry: 'Education',
      dateFounded: new Date('2014-04-01'),
      techStack: ['Node.js', 'React Native', 'Python', 'MongoDB', 'AWS'],
      description: 'Ruangguru adalah platform edtech terbesar di Indonesia yang membantu jutaan siswa belajar dengan lebih efektif melalui teknologi.',
      companyId: ruangguru.id,
    },
  });

  await prisma.companySocialMedia.create({
    data: {
      instagram: 'https://instagram.com/ruaboruanggurupi',
      twitter: 'https://twitter.com/ruangguru',
      facebook: 'https://facebook.com/ruangguru',
      linkedin: 'https://linkedin.com/company/ruangguru',
      youtube: 'https://youtube.com/@ruangguru',
      companyId: ruangguru.id,
    },
  });

  console.log('✅ 3 Companies created');

  // ============================================
  // 20 USERS (Job Seekers)
  // ============================================
  console.log('👥 Creating 20 users...');

  const usersData = [
    { name: 'Budi Santoso', email: 'budi.santoso@gmail.com', headline: 'Senior Frontend Developer', location: 'Jakarta', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
    { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@gmail.com', headline: 'UI/UX Designer', location: 'Bandung', skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'] },
    { name: 'Agus Prasetyo', email: 'agus.prasetyo@gmail.com', headline: 'Backend Engineer', location: 'Surabaya', skills: ['Go', 'Python', 'PostgreSQL', 'Docker'] },
    { name: 'Dewi Kartika', email: 'dewi.kartika@gmail.com', headline: 'Data Scientist', location: 'Jakarta', skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning'] },
    { name: 'Rizky Hidayat', email: 'rizky.hidayat@gmail.com', headline: 'DevOps Engineer', location: 'Yogyakarta', skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'] },
    { name: 'Anisa Putri', email: 'anisa.putri@gmail.com', headline: 'Product Manager', location: 'Jakarta', skills: ['Agile', 'Jira', 'Product Strategy', 'User Stories'] },
    { name: 'Fajar Nugroho', email: 'fajar.nugroho@gmail.com', headline: 'Mobile Developer', location: 'Malang', skills: ['Kotlin', 'Swift', 'Flutter', 'React Native'] },
    { name: 'Rina Wulandari', email: 'rina.wulandari@gmail.com', headline: 'QA Engineer', location: 'Jakarta', skills: ['Selenium', 'Jest', 'Cypress', 'API Testing'] },
    { name: 'Hendra Wijaya', email: 'hendra.wijaya@gmail.com', headline: 'Full Stack Developer', location: 'Bali', skills: ['Node.js', 'React', 'MongoDB', 'GraphQL'] },
    { name: 'Maya Sari', email: 'maya.sari@gmail.com', headline: 'Digital Marketing Specialist', location: 'Bandung', skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'] },
    { name: 'Dimas Prakoso', email: 'dimas.prakoso@gmail.com', headline: 'Software Engineer', location: 'Jakarta', skills: ['Java', 'Spring Boot', 'Microservices', 'MySQL'] },
    { name: 'Lestari Putri', email: 'lestari.putri@gmail.com', headline: 'Content Writer', location: 'Semarang', skills: ['Copywriting', 'SEO Writing', 'Content Strategy', 'Editing'] },
    { name: 'Arief Rahman', email: 'arief.rahman@gmail.com', headline: 'Cloud Architect', location: 'Jakarta', skills: ['AWS', 'Azure', 'GCP', 'Solution Architecture'] },
    { name: 'Putri Ayu', email: 'putri.ayu@gmail.com', headline: 'HR Manager', location: 'Surabaya', skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Training'] },
    { name: 'Bayu Setiawan', email: 'bayu.setiawan@gmail.com', headline: 'Security Engineer', location: 'Jakarta', skills: ['Penetration Testing', 'Security Audit', 'OWASP', 'Incident Response'] },
    { name: 'Citra Dewi', email: 'citra.dewi@gmail.com', headline: 'Business Analyst', location: 'Bandung', skills: ['Requirements Analysis', 'SQL', 'Tableau', 'Process Mapping'] },
    { name: 'Eko Prasetya', email: 'eko.prasetya@gmail.com', headline: 'Frontend Developer', location: 'Yogyakarta', skills: ['Vue.js', 'JavaScript', 'CSS', 'Webpack'] },
    { name: 'Fitri Handayani', email: 'fitri.handayani@gmail.com', headline: 'Data Analyst', location: 'Jakarta', skills: ['SQL', 'Python', 'Excel', 'Power BI'] },
    { name: 'Galih Permana', email: 'galih.permana@gmail.com', headline: 'iOS Developer', location: 'Malang', skills: ['Swift', 'SwiftUI', 'Xcode', 'Core Data'] },
    { name: 'Indah Permatasari', email: 'indah.permata@gmail.com', headline: 'Graphic Designer', location: 'Bali', skills: ['Photoshop', 'Illustrator', 'InDesign', 'Branding'] },
  ];

  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        avatar: `/images/avatars/${userData.name.toLowerCase().replace(/ /g, '-')}.jpg`,
      },
    });
    users.push(user);
  }

  console.log('✅ 20 Users created');

  // ============================================
  // 15 JOB LISTINGS
  // ============================================
  console.log('💼 Creating 15 job listings...');

  const jobsData = [
    // GojekTech Jobs (5)
    {
      roles: 'Senior Frontend Engineer',
      companyId: gojektech.id,
      categoryId: 'software-engineering',
      department: 'Engineering',
      location: 'Jakarta, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryFrom: '25000000',
      salaryTo: '45000000',
      currency: 'IDR',
      needs: 2,
      dueDate: new Date('2025-03-31'),
      requiredSkills: ['React', 'TypeScript', 'Next.js', 'Testing Library'],
      description: 'Kami mencari Senior Frontend Engineer untuk memimpin pengembangan UI pada aplikasi super-app kami yang digunakan jutaan pengguna.',
      responsibility: 'Mengembangkan fitur baru dengan standar kualitas tinggi, melakukan code review, mentoring junior developers, dan berkolaborasi dengan tim product.',
      whoYouAre: 'Minimal 5 tahun pengalaman dengan React, expert di TypeScript, familiar dengan performance optimization, dan memiliki pengalaman membangun aplikasi skala besar.',
      niceToHaves: 'Pengalaman dengan micro-frontends, WebSocket, PWA, atau mobile development.',
      benefits: [{ benefit: 'Health Insurance', description: 'Full coverage' }, { benefit: 'Stock Options', description: 'ESOP' }, { benefit: 'Remote Work', description: 'Hybrid' }],
      status: 'active',
      views: 342,
      applicants: 0,
    },
    {
      roles: 'Backend Engineer - Go',
      companyId: gojektech.id,
      categoryId: 'software-engineering',
      department: 'Engineering',
      location: 'Jakarta, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '20000000',
      salaryTo: '35000000',
      currency: 'IDR',
      needs: 3,
      dueDate: new Date('2025-04-15'),
      requiredSkills: ['Go', 'PostgreSQL', 'Redis', 'Kubernetes', 'gRPC'],
      description: 'Bergabunglah dengan tim backend kami untuk membangun microservices yang scalable dan reliable.',
      responsibility: 'Mendesain dan mengimplementasi API, mengoptimasi performa sistem, dan memastikan uptime 99.9%.',
      whoYouAre: 'Minimal 3 tahun pengalaman dengan Go, solid understanding databases, familiar dengan distributed systems.',
      niceToHaves: 'Pengalaman dengan Kafka, Elasticsearch, atau service mesh.',
      benefits: [{ benefit: 'Learning Budget', description: 'Rp 10.000.000/tahun' }, { benefit: 'Flexible Hours', description: 'Core hours 10-16' }],
      status: 'active',
      views: 256,
      applicants: 0,
    },
    {
      roles: 'Site Reliability Engineer',
      companyId: gojektech.id,
      categoryId: 'software-engineering',
      department: 'Infrastructure',
      location: 'Jakarta, Indonesia (Remote OK)',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryFrom: '30000000',
      salaryTo: '50000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-03-20'),
      requiredSkills: ['Kubernetes', 'Terraform', 'AWS/GCP', 'Prometheus', 'Python'],
      description: 'Jaga reliabilitas platform yang melayani jutaan request per detik.',
      responsibility: 'Manage infrastructure at scale, implement SLOs, automate operations, incident response.',
      whoYouAre: 'Minimal 5 tahun di SRE/DevOps, expert Kubernetes, strong automation mindset.',
      niceToHaves: 'Pengalaman dengan chaos engineering, FinOps.',
      benefits: [{ benefit: 'Full Remote', description: 'Work from anywhere' }, { benefit: 'Equipment Budget', description: 'Latest MacBook Pro' }],
      status: 'active',
      views: 189,
      applicants: 0,
    },
    {
      roles: 'Product Manager - Payments',
      companyId: gojektech.id,
      categoryId: 'operations',
      department: 'Product',
      location: 'Jakarta, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryFrom: '35000000',
      salaryTo: '55000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-04-01'),
      requiredSkills: ['Product Strategy', 'Fintech', 'Agile', 'Data Analysis', 'Stakeholder Management'],
      description: 'Pimpin pengembangan produk payment yang digunakan puluhan juta pengguna.',
      responsibility: 'Define product roadmap, work with engineering team, analyze metrics, drive growth.',
      whoYouAre: 'Minimal 5 tahun sebagai PM, pengalaman di fintech/payments, data-driven mindset.',
      niceToHaves: 'Technical background, pengalaman dengan regulatory compliance.',
      benefits: [{ benefit: 'Performance Bonus', description: 'Up to 4 months salary' }],
      status: 'active',
      views: 421,
      applicants: 0,
    },
    {
      roles: 'Data Engineer',
      companyId: gojektech.id,
      categoryId: 'data-analytics',
      department: 'Data',
      location: 'Jakarta, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '22000000',
      salaryTo: '38000000',
      currency: 'IDR',
      needs: 2,
      dueDate: new Date('2025-03-25'),
      requiredSkills: ['Python', 'Spark', 'Airflow', 'BigQuery', 'Data Modeling'],
      description: 'Bangun data platform yang mendukung analytics dan ML untuk seluruh perusahaan.',
      responsibility: 'Build ETL pipelines, maintain data warehouse, ensure data quality, support data scientists.',
      whoYouAre: 'Minimal 3 tahun sebagai data engineer, proficient Python & SQL, familiar dengan big data tools.',
      niceToHaves: 'Pengalaman dengan streaming data, dbt, atau data mesh.',
      benefits: [{ benefit: 'Conference Budget', description: 'Attend international conferences' }],
      status: 'active',
      views: 198,
      applicants: 0,
    },

    // Tokopedia Jobs (5)
    {
      roles: 'Mobile Engineer - Android',
      companyId: tokped.id,
      categoryId: 'software-engineering',
      department: 'Mobile',
      location: 'Jakarta Selatan, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '18000000',
      salaryTo: '32000000',
      currency: 'IDR',
      needs: 2,
      dueDate: new Date('2025-04-10'),
      requiredSkills: ['Kotlin', 'Android SDK', 'MVVM', 'Jetpack Compose', 'Unit Testing'],
      description: 'Kembangkan aplikasi Android Tokopedia yang digunakan puluhan juta pengguna.',
      responsibility: 'Build new features, optimize performance, write clean code, collaborate with iOS team.',
      whoYouAre: 'Minimal 3 tahun Android development, strong Kotlin skills, experience with large codebases.',
      niceToHaves: 'Pengalaman dengan Kotlin Multiplatform, modularization.',
      benefits: [{ benefit: 'Shopping Voucher', description: 'Rp 500.000/bulan' }, { benefit: 'Gym Membership', description: 'Free' }],
      status: 'active',
      views: 287,
      applicants: 0,
    },
    {
      roles: 'UX Researcher',
      companyId: tokped.id,
      categoryId: 'product-design',
      department: 'Design',
      location: 'Jakarta Selatan, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '15000000',
      salaryTo: '28000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-03-28'),
      requiredSkills: ['User Research', 'Usability Testing', 'Survey Design', 'Data Analysis', 'Figma'],
      description: 'Pahami kebutuhan pengguna untuk membuat pengalaman belanja online terbaik.',
      responsibility: 'Conduct user research, usability testing, analyze findings, present insights to stakeholders.',
      whoYouAre: 'Minimal 2 tahun UX research, strong analytical skills, excellent communication.',
      niceToHaves: 'Background psychology atau HCI, pengalaman dengan A/B testing.',
      benefits: [{ benefit: 'Lunch Allowance', description: 'Daily catering' }],
      status: 'active',
      views: 156,
      applicants: 0,
    },
    {
      roles: 'Machine Learning Engineer',
      companyId: tokped.id,
      categoryId: 'data-analytics',
      department: 'AI/ML',
      location: 'Jakarta Selatan, Indonesia (Hybrid)',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryFrom: '35000000',
      salaryTo: '60000000',
      currency: 'IDR',
      needs: 2,
      dueDate: new Date('2025-04-20'),
      requiredSkills: ['Python', 'TensorFlow/PyTorch', 'MLOps', 'Recommendation Systems', 'NLP'],
      description: 'Bangun model ML untuk personalization dan fraud detection.',
      responsibility: 'Develop ML models, deploy to production, monitor performance, collaborate with product.',
      whoYouAre: 'Minimal 4 tahun ML engineering, strong Python, experience deploying models at scale.',
      niceToHaves: 'PhD in ML/AI, papers published, experience with recommender systems.',
      benefits: [{ benefit: 'Research Time', description: '20% time for research projects' }],
      status: 'active',
      views: 312,
      applicants: 0,
    },
    {
      roles: 'Technical Program Manager',
      companyId: tokped.id,
      categoryId: 'operations',
      department: 'Engineering',
      location: 'Jakarta Selatan, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryFrom: '30000000',
      salaryTo: '48000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-03-30'),
      requiredSkills: ['Project Management', 'Technical Knowledge', 'Stakeholder Management', 'Agile', 'Communication'],
      description: 'Koordinasi proyek teknis berskala besar melibatkan multiple teams.',
      responsibility: 'Drive cross-functional projects, manage timelines, identify risks, communicate with leadership.',
      whoYouAre: 'Minimal 5 tahun TPM atau engineering leadership, technical background preferred.',
      niceToHaves: 'PMP certification, experience with platform migrations.',
      benefits: [{ benefit: 'Leadership Training', description: 'Annual training programs' }],
      status: 'active',
      views: 178,
      applicants: 0,
    },
    {
      roles: 'Security Engineer',
      companyId: tokped.id,
      categoryId: 'software-engineering',
      department: 'Security',
      location: 'Jakarta Selatan, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '22000000',
      salaryTo: '40000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-04-05'),
      requiredSkills: ['Application Security', 'Penetration Testing', 'OWASP', 'Cloud Security', 'Python'],
      description: 'Amankan platform e-commerce terbesar di Indonesia dari berbagai ancaman.',
      responsibility: 'Security assessments, penetration testing, security automation, incident response.',
      whoYouAre: 'Minimal 3 tahun security engineering, familiar with OWASP, experience with cloud security.',
      niceToHaves: 'OSCP/CEH certification, bug bounty experience.',
      benefits: [{ benefit: 'Security Training', description: 'Certification sponsorship' }],
      status: 'active',
      views: 145,
      applicants: 0,
    },

    // Ruangguru Jobs (5)
    {
      roles: 'React Native Developer',
      companyId: ruangguru.id,
      categoryId: 'software-engineering',
      department: 'Mobile',
      location: 'Jakarta, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '15000000',
      salaryTo: '28000000',
      currency: 'IDR',
      needs: 2,
      dueDate: new Date('2025-04-12'),
      requiredSkills: ['React Native', 'TypeScript', 'Redux', 'REST API', 'Jest'],
      description: 'Kembangkan aplikasi mobile Ruangguru untuk iOS dan Android.',
      responsibility: 'Build features, fix bugs, optimize performance, write tests.',
      whoYouAre: 'Minimal 2 tahun React Native, familiar dengan native modules.',
      niceToHaves: 'Pengalaman dengan native iOS/Android development.',
      benefits: [{ benefit: 'Free Learning', description: 'Akses semua produk Ruangguru' }],
      status: 'active',
      views: 234,
      applicants: 0,
    },
    {
      roles: 'Content Creator - Education',
      companyId: ruangguru.id,
      categoryId: 'marketing',
      department: 'Content',
      location: 'Jakarta, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Junior',
      salaryFrom: '8000000',
      salaryTo: '15000000',
      currency: 'IDR',
      needs: 3,
      dueDate: new Date('2025-03-18'),
      requiredSkills: ['Content Writing', 'Video Editing', 'Education Background', 'Creative Thinking'],
      description: 'Buat konten edukasi yang menarik dan mudah dipahami oleh siswa.',
      responsibility: 'Create educational content, collaborate with tutors, maintain content quality.',
      whoYouAre: 'Fresh graduate welcome, passion for education, creative and detail-oriented.',
      niceToHaves: 'Teaching experience, social media content creation skills.',
      benefits: [{ benefit: 'Career Growth', description: 'Fast-track promotion' }],
      status: 'active',
      views: 567,
      applicants: 0,
    },
    {
      roles: 'DevOps Engineer',
      companyId: ruangguru.id,
      categoryId: 'software-engineering',
      department: 'Infrastructure',
      location: 'Jakarta, Indonesia (Remote OK)',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '18000000',
      salaryTo: '32000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-04-08'),
      requiredSkills: ['AWS', 'Docker', 'CI/CD', 'Terraform', 'Linux'],
      description: 'Kelola infrastructure yang mendukung jutaan siswa belajar.',
      responsibility: 'Manage cloud infrastructure, implement CI/CD, monitor systems, automate operations.',
      whoYouAre: 'Minimal 2 tahun DevOps, strong AWS skills, automation mindset.',
      niceToHaves: 'Pengalaman dengan Kubernetes, cost optimization.',
      benefits: [{ benefit: 'Remote Work', description: 'Full remote option' }],
      status: 'active',
      views: 189,
      applicants: 0,
    },
    {
      roles: 'UI Designer',
      companyId: ruangguru.id,
      categoryId: 'product-design',
      department: 'Design',
      location: 'Bandung, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Junior',
      salaryFrom: '10000000',
      salaryTo: '18000000',
      currency: 'IDR',
      needs: 1,
      dueDate: new Date('2025-03-22'),
      requiredSkills: ['Figma', 'UI Design', 'Design System', 'Mobile Design', 'Prototyping'],
      description: 'Desain interface yang user-friendly untuk platform pembelajaran.',
      responsibility: 'Create UI designs, maintain design system, collaborate with developers.',
      whoYouAre: 'Minimal 1 tahun UI design, strong Figma skills, portfolio required.',
      niceToHaves: 'Illustration skills, motion design.',
      benefits: [{ benefit: 'Design Tools', description: 'All design tools provided' }],
      status: 'active',
      views: 298,
      applicants: 0,
    },
    {
      roles: 'Customer Success Manager',
      companyId: ruangguru.id,
      categoryId: 'customer-support',
      department: 'Customer Success',
      location: 'Surabaya, Indonesia',
      jobType: 'Full-Time',
      experienceLevel: 'Mid-Level',
      salaryFrom: '12000000',
      salaryTo: '22000000',
      currency: 'IDR',
      needs: 2,
      dueDate: new Date('2025-04-01'),
      requiredSkills: ['Customer Service', 'Communication', 'Problem Solving', 'CRM', 'Education Industry'],
      description: 'Pastikan kepuasan pelanggan dan retensi pengguna platform.',
      responsibility: 'Manage customer relationships, handle escalations, drive retention, gather feedback.',
      whoYouAre: 'Minimal 2 tahun customer success/service, excellent communication.',
      niceToHaves: 'Experience in edtech, B2B sales experience.',
      benefits: [{ benefit: 'Commission', description: 'Performance-based bonus' }],
      status: 'active',
      views: 167,
      applicants: 0,
    },
  ];

  for (const jobData of jobsData) {
    await prisma.job.create({
      data: jobData,
    });
  }

  console.log('✅ 15 Jobs created');

  // ============================================
  // SAMPLE APPLICATIONS
  // ============================================
  console.log('📝 Creating sample applications...');

  // Get all jobs and randomly assign some applicants
  const allJobs = await prisma.job.findMany();

  // Create 8-10 sample applications
  const applications = [
    { userId: users[0].id, jobId: allJobs[0].id, previousJobTitle: 'Frontend Developer at Startup ABC', phone: '081234567890', linkedin: 'https://linkedin.com/in/budi-santoso', portfolio: 'https://budisantoso.dev', coverLetter: 'Saya sangat tertarik dengan posisi ini karena...', resume: '/uploads/resume-budi.pdf', status: 'in_review', rating: 4 },
    { userId: users[2].id, jobId: allJobs[1].id, previousJobTitle: 'Backend Engineer at XYZ Corp', phone: '081234567891', linkedin: 'https://linkedin.com/in/agus-prasetyo', portfolio: 'https://github.com/agusprasetyo', coverLetter: 'Dengan pengalaman 4 tahun di backend development...', resume: '/uploads/resume-agus.pdf', status: 'new', rating: null },
    { userId: users[3].id, jobId: allJobs[4].id, previousJobTitle: 'Junior Data Analyst', phone: '081234567892', linkedin: 'https://linkedin.com/in/dewi-kartika', portfolio: 'https://kaggle.com/dewikartika', coverLetter: 'Saya memiliki passion di data science...', resume: '/uploads/resume-dewi.pdf', status: 'interview', rating: 5 },
    { userId: users[6].id, jobId: allJobs[5].id, previousJobTitle: 'Android Developer at Mobile Studio', phone: '081234567893', linkedin: 'https://linkedin.com/in/fajar-nugroho', portfolio: 'https://play.google.com/store/apps/dev?id=fajar', coverLetter: 'Tertarik untuk bergabung dengan tim mobile Tokopedia...', resume: '/uploads/resume-fajar.pdf', status: 'new', rating: null },
    { userId: users[1].id, jobId: allJobs[6].id, previousJobTitle: 'UI Designer Freelance', phone: '081234567894', linkedin: 'https://linkedin.com/in/siti-nurhaliza', portfolio: 'https://dribbble.com/sitinurhaliza', coverLetter: 'Saya memiliki pengalaman 3 tahun di UI/UX...', resume: '/uploads/resume-siti.pdf', status: 'in_review', rating: 4 },
    { userId: users[10].id, jobId: allJobs[7].id, previousJobTitle: 'ML Engineer at AI Startup', phone: '081234567895', linkedin: 'https://linkedin.com/in/dimas-prakoso', portfolio: 'https://github.com/dimasprakoso', coverLetter: 'Pengalaman saya di machine learning...', resume: '/uploads/resume-dimas.pdf', status: 'new', rating: null },
    { userId: users[16].id, jobId: allJobs[10].id, previousJobTitle: 'Frontend Developer Intern', phone: '081234567896', linkedin: 'https://linkedin.com/in/eko-prasetya', portfolio: 'https://ekoprasetya.github.io', coverLetter: 'Fresh graduate dengan passion di frontend...', resume: '/uploads/resume-eko.pdf', status: 'new', rating: null },
    { userId: users[19].id, jobId: allJobs[13].id, previousJobTitle: 'Junior Designer', phone: '081234567897', linkedin: 'https://linkedin.com/in/indah-permata', portfolio: 'https://behance.net/indahpermata', coverLetter: 'Saya tertarik untuk berkontribusi di Ruangguru...', resume: '/uploads/resume-indah.pdf', status: 'interview', rating: 4 },
  ];

  for (const app of applications) {
    await prisma.applicant.create({
      data: app,
    });
  }

  // Update job applicant counts
  for (const job of allJobs) {
    const count = await prisma.applicant.count({ where: { jobId: job.id } });
    await prisma.job.update({
      where: { id: job.id },
      data: { applicants: count },
    });
  }

  console.log('✅ Sample applications created');

  // ============================================
  // ACTIVITY LOGS
  // ============================================
  console.log('📊 Creating activity logs...');

  const activities = [
    { companyId: gojektech.id, type: 'job_created', message: 'New job posted: Senior Frontend Engineer' },
    { companyId: gojektech.id, type: 'application_received', message: 'New application for Senior Frontend Engineer from Budi Santoso' },
    { companyId: tokped.id, type: 'job_created', message: 'New job posted: Mobile Engineer - Android' },
    { companyId: tokped.id, type: 'application_received', message: 'New application for UX Researcher from Siti Nurhaliza' },
    { companyId: ruangguru.id, type: 'job_created', message: 'New job posted: React Native Developer' },
    { companyId: ruangguru.id, type: 'application_received', message: 'New application for UI Designer from Indah Permatasari' },
  ];

  for (const activity of activities) {
    await prisma.activity.create({
      data: activity,
    });
  }

  console.log('✅ Activity logs created');

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n🎉 Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`   • Companies: 3`);
  console.log(`   • Job Listings: 15`);
  console.log(`   • Users (Job Seekers): 20`);
  console.log(`   • Applications: ${applications.length}`);
  console.log(`   • Categories: ${categories.length}`);
  console.log(`   • Industries: ${industries.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n🔐 Login Credentials:');
  console.log('   Companies:');
  console.log('     • hr@gojektech.co.id / admin123');
  console.log('     • careers@tokopedia.com / password123');
  console.log('     • talent@ruangguru.com / password123');
  console.log('   Users (all use password123):');
  console.log('     • budi.santoso@gmail.com');
  console.log('     • siti.nurhaliza@gmail.com');
  console.log('     • (and 18 more...)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
