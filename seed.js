// Creates the first admin (from .env) and sample internships.  Run: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Internship = require('./models/Internship');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  if (!email || !process.env.ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({ name: 'Portal Admin', email, role: 'admin',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) });
    console.log('Admin created:', email);
  } else console.log('Admin already exists:', email);

  if (!(await Internship.countDocuments())) {
    const d = n => new Date(Date.now() + n * 864e5);
    await Internship.insertMany([
      { title: 'Frontend Developer Intern', company: 'Pixel Labs', location: 'Chennai', remote: false, skills: ['React', 'CSS', 'JavaScript'], eligibility: 'Final-year B.E/B.Tech', deadline: d(20), applyInfo: 'https://example.com/apply/pixel', createdBy: admin._id },
      { title: 'Data Analyst Intern', company: 'Insight Corp', location: 'Bengaluru', remote: true, skills: ['Python', 'SQL', 'Excel'], eligibility: 'Any degree, 2nd year+', deadline: d(35), applyInfo: 'Email your CV to jobs@insight.example', createdBy: admin._id },
      { title: 'Backend Intern (Node.js)', company: 'CloudNest', location: 'Remote', remote: true, skills: ['Node.js', 'MongoDB', 'Express'], eligibility: 'CS/IT students', deadline: d(12), applyInfo: 'https://example.com/apply/cloudnest', createdBy: admin._id },
      { title: 'UI/UX Design Intern', company: 'Studio Nine', location: 'Hyderabad', remote: false, skills: ['Figma', 'Prototyping'], eligibility: 'Design or CS students', deadline: d(28), applyInfo: 'Submit portfolio at studionine.example/intern', createdBy: admin._id }
    ]);
    console.log('Sample internships added');
  }
  await mongoose.disconnect();
})().catch(e => { console.error(e.message); process.exit(1); });
