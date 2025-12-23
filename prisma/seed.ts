import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password for admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create Admin Company
  const adminCompany = await prisma.company.upsert({
    where: { email: 'admin@hiredwork.com' },
    update: {},
    create: {
      name: 'Hired Work Admin',
      email: 'admin@hiredwork.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin Company created:', adminCompany.email);

  // Create Company Overview for Admin
  await prisma.companyOverview.upsert({
    where: { id: 'admin-overview' },
    update: {},
    create: {
      id: 'admin-overview',
      name: 'Hired Work',
      image: '/images/logo.png',
      website: 'https://hiredwork.com',
      location: 'Jakarta, Indonesia',
      employee: '10-50',
      industry: 'Technology',
      dateFounded: new Date('2024-01-01'),
      techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      description: 'Platform job portal modern untuk menghubungkan talent terbaik dengan perusahaan teknologi.',
      companyId: adminCompany.id,
    },
  });

  console.log('✅ Company Overview created');

  // Create Social Media for Admin
  await prisma.companySocialMedia.upsert({
    where: { id: 'admin-social' },
    update: {},
    create: {
      id: 'admin-social',
      instagram: 'https://instagram.com/hiredwork',
      twitter: 'https://twitter.com/hiredwork',
      facebook: 'https://facebook.com/hiredwork',
      linkedin: 'https://linkedin.com/company/hiredwork',
      youtube: 'https://youtube.com/@hiredwork',
      companyId: adminCompany.id,
    },
  });

  console.log('✅ Company Social Media created');

  // Seed Job Categories
  const categories = [
    'Software Engineering',
    'Product & Design',
    'Data & Analytics',
    'Marketing',
    'Operations',
    'Sales',
    'Customer Support',
    'Human Resources',
    'Finance',
  ];

  for (const categoryName of categories) {
    await prisma.categoryJob.upsert({
      where: { id: categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') },
      update: {},
      create: {
        id: categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
        name: categoryName,
      },
    });
  }

  console.log('✅ Job Categories created');

  // Seed Industries
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Education',
    'Manufacturing',
    'Media & Entertainment',
    'Logistics',
    'Real Estate',
  ];

  for (const industryName of industries) {
    await prisma.industry.upsert({
      where: { id: industryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') },
      update: {},
      create: {
        id: industryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
        name: industryName,
      },
    });
  }

  console.log('✅ Industries created');

  // Seed Sample Jobs
  const sampleJobs = [
    {
      id: 'job-frontend-engineer',
      roles: 'Frontend Engineer',
      dueDate: new Date('2025-02-28'),
      jobType: 'Full-Time',
      applicants: 0,
      needs: 2,
      salaryFrom: '15000000',
      salaryTo: '25000000',
      requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      description: 'Kami mencari Frontend Engineer yang passionate untuk membangun user interface yang modern dan performant.',
      responsibility: 'Mengembangkan fitur baru dengan React/Next.js, berkolaborasi dengan tim desain, melakukan code review, dan memastikan kualitas kode.',
      whoYouAre: 'Minimal 2 tahun pengalaman dengan React, memahami TypeScript, familiar dengan modern CSS frameworks, dan memiliki kemampuan problem-solving yang baik.',
      niceToHaves: 'Pengalaman dengan testing (Jest, Cypress), familiar dengan CI/CD, pernah bekerja di startup.',
      benefits: JSON.stringify([
        { benefit: 'Health Insurance', description: 'Full coverage untuk karyawan dan keluarga' },
        { benefit: 'Remote Work', description: 'Flexible WFH policy' },
        { benefit: 'Learning Budget', description: 'Rp 5.000.000/tahun untuk kursus dan konferensi' },
      ]),
      categoryId: 'software-engineering',
    },
    {
      id: 'job-backend-engineer',
      roles: 'Backend Engineer',
      dueDate: new Date('2025-03-15'),
      jobType: 'Full-Time',
      applicants: 0,
      needs: 3,
      salaryFrom: '18000000',
      salaryTo: '30000000',
      requiredSkills: ['Node.js', 'PostgreSQL', 'Docker', 'REST API', 'GraphQL'],
      description: 'Join our backend team untuk membangun scalable API dan microservices.',
      responsibility: 'Merancang dan mengimplementasi API, mengoptimasi database queries, maintaining infrastructure, dan mentoring junior developers.',
      whoYouAre: 'Minimal 3 tahun pengalaman backend development, strong di Node.js atau Python, memahami database design, dan familiar dengan cloud services.',
      niceToHaves: 'Pengalaman dengan Kubernetes, message queues (RabbitMQ/Kafka), dan system design.',
      benefits: JSON.stringify([
        { benefit: 'Competitive Salary', description: 'Gaji kompetitif + bonus tahunan' },
        { benefit: 'Stock Options', description: 'Employee stock ownership plan' },
        { benefit: 'Unlimited PTO', description: 'Cuti tidak terbatas dengan approval' },
      ]),
      categoryId: 'software-engineering',
    },
    {
      id: 'job-ui-ux-designer',
      roles: 'UI/UX Designer',
      dueDate: new Date('2025-02-20'),
      jobType: 'Full-Time',
      applicants: 0,
      needs: 1,
      salaryFrom: '12000000',
      salaryTo: '20000000',
      requiredSkills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design System'],
      description: 'Kami mencari designer kreatif untuk menciptakan pengalaman digital yang luar biasa.',
      responsibility: 'Melakukan user research, membuat wireframes dan prototypes, developing design system, dan berkolaborasi dengan engineers.',
      whoYouAre: 'Minimal 2 tahun pengalaman UI/UX design, portfolio yang kuat, memahami design thinking, dan bisa bekerja dalam tim agile.',
      niceToHaves: 'Pengalaman dengan motion design, basic frontend coding, atau product analytics.',
      benefits: JSON.stringify([
        { benefit: 'Creative Freedom', description: 'Kebebasan bereksperimen dengan desain' },
        { benefit: 'Latest Tools', description: 'Akses ke semua tools design premium' },
        { benefit: 'Career Growth', description: 'Path to Design Lead/Manager' },
      ]),
      categoryId: 'product-design',
    },
    {
      id: 'job-data-analyst',
      roles: 'Data Analyst',
      dueDate: new Date('2025-03-01'),
      jobType: 'Full-Time',
      applicants: 0,
      needs: 2,
      salaryFrom: '10000000',
      salaryTo: '18000000',
      requiredSkills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics'],
      description: 'Bantu kami mengubah data menjadi insights yang actionable untuk business decisions.',
      responsibility: 'Menganalisis data bisnis, membuat dashboard dan reports, melakukan A/B testing analysis, dan presentasi ke stakeholders.',
      whoYouAre: 'Minimal 1 tahun pengalaman data analysis, strong SQL skills, familiar dengan visualization tools, dan memiliki business acumen.',
      niceToHaves: 'Pengalaman dengan machine learning, data engineering, atau product analytics.',
      benefits: JSON.stringify([
        { benefit: 'Flexible Hours', description: 'Jam kerja fleksibel' },
        { benefit: 'Training', description: 'Pelatihan data science/analytics' },
        { benefit: 'Team Outing', description: 'Team building setiap kuartal' },
      ]),
      categoryId: 'data-analytics',
    },
    {
      id: 'job-marketing-intern',
      roles: 'Digital Marketing Intern',
      dueDate: new Date('2025-01-31'),
      jobType: 'Internship',
      applicants: 0,
      needs: 2,
      salaryFrom: '2500000',
      salaryTo: '4000000',
      requiredSkills: ['Social Media', 'Content Writing', 'Canva', 'Google Analytics'],
      description: 'Kesempatan magang untuk belajar digital marketing dari praktisi berpengalaman.',
      responsibility: 'Membantu manage social media, membuat content calendar, menganalisis campaign performance, dan brainstorming ideas.',
      whoYouAre: 'Mahasiswa tingkat akhir atau fresh graduate, antusias dengan digital marketing, kreatif, dan bisa menulis dengan baik.',
      niceToHaves: 'Pengalaman mengelola akun social media pribadi/organisasi, basic video editing.',
      benefits: JSON.stringify([
        { benefit: 'Mentorship', description: 'Dibimbing langsung oleh Marketing Manager' },
        { benefit: 'Certificate', description: 'Sertifikat magang resmi' },
        { benefit: 'Full-Time Opportunity', description: 'Kesempatan jadi karyawan tetap' },
      ]),
      categoryId: 'marketing',
    },
  ];

  for (const job of sampleJobs) {
    await prisma.job.upsert({
      where: { id: job.id },
      update: {},
      create: {
        ...job,
        benefits: JSON.parse(job.benefits as string),
        companyId: adminCompany.id,
      },
    });
  }

  console.log('✅ Sample Jobs created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
