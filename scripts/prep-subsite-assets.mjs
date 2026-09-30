// One-off: bring subdomain images (coach deck, impact report, AI page) into src/assets/img with clean names.
import fs from 'node:fs';
import sharp from 'sharp';
const dir = 'content/images/subsites/';
const map = {
  'deck-hero': 'coach--Level_Up_Coaches_2023-Edit.jpg', 'deck-match-day': 'coach--Match_Day_2025.jpeg', 'deck-jessica': 'coach--jessica-k.jpg',
  'deck-stephanie': 'coach--stephanie-l.jpg', 'deck-jose': 'coach--jose-a.jpg', 'deck-martha-trihealth': 'coach--martha-trihealth.jpg',
  'deck-event-matchday': 'coach--event-matchday.jpg', 'deck-event-pd': 'coach--event-pd-day.jpg', 'deck-event-finance': 'coach--event-finance-dinner.jpg',
  'deck-event-network': 'coach--event-network.jpg', 'deck-graduate': 'coach--graduate.jpg', 'deck-qr': 'coach--qr-become-a-coach.png',
  'impact-hero': 'impact--Impact_Report_Hero_Image_-2025.jpeg', 'impact-jim': 'impact--Founder_Image.jpeg', 'impact-sarah': 'impact--Sarah.JPG',
  'impact-martha-work': 'impact--Martha_Work.jpeg', 'impact-nick-stuart': 'impact--Nick_and_Stuart.jpeg', 'impact-tricia-steph': 'impact--Tricia_Steph.jpg',
  'impact-jordan-ndeye': 'impact--Jordan_and_Ndeye.jpg', 'impact-ian': 'impact--Ian.jpeg', 'impact-afo': 'impact--Aiming_for_Opportunity_Image_1.jpg',
  'impact-ub-2025': 'impact--urban_bourbon_2025.jpeg', 'impact-ew-2025': 'impact--Elevating_Women_Group_Photo.jpeg',
  'impact-alive': 'impact--Alive_Events_and_Marketing.png', 'impact-its': 'impact--Impact_Talent_Strategies.png', 'impact-uc': 'impact--Screenshot_2026-02-06_at_6.16.36_PM.png',
  'ai-sarah-grad': 'ai--sarah-grad.jpg', 'ai-jim': 'ai--jim-headshot.jpg', 'ai-win-grant': 'ai--win-grant.png', 'ai-win-app': 'ai--win-app.png',
  'ai-win-salesforce': 'ai--win-salesforce.png', 'ai-win-wiki': 'ai--win-wiki.png', 'ai-win-website': 'ai--win-website.png', 'ai-win-skills': 'ai--win-skills.png',
  'ai-win-onboarding': 'ai--win-onboarding.png', 'ai-win-pulse': 'ai--win-pulse.png',
};
const gallery = ['Finance_Dinner.jpg', 'Student_Networking.jpg', 'Elevating_Women_Group_Photo_2.jpeg', 'Mentor-Mentee-1.jpeg', 'Level_Up_Coaches_at_Match_Day.JPG', 'Coach-Student-Orientation.jpeg', 'Professional-Development-Retreat.jpeg', 'Sarah_Stacy.jpeg', 'Sarah_Study_Abroad.jpeg', 'Student_and_Coach_at_Match_Day.jpeg', 'Level-Up-Event-Group.JPG', 'Gallery-1.jpeg', 'Gallery-2.jpeg', 'LevelUp_Aiming-For-Opportunity_2025-72.jpg', 'Gallery-3.jpeg', 'Mentor-Mentee-2.jpeg', 'LevelUp_Aiming-For-Opportunity_2025-103.jpg', 'Gallery-4.jpeg', 'Level-Up-Moment-1.jpeg', 'Level-Up-Moment-2.jpeg', 'Gallery-5.jpeg', 'Gallery-6.jpeg', 'Gallery-7.jpeg', 'Level_Up_25-12.jpg'];
gallery.forEach((f, i) => (map[`impact-gallery-${String(i + 1).padStart(2, '0')}`] = 'impact--' + f));
for (const [name, file] of Object.entries(map)) {
  const s = sharp(dir + file).rotate(); const { width, format } = await s.metadata();
  const ext = format === 'jpeg' ? 'jpg' : format; const out = `src/assets/img/${name}.${ext}`;
  if (fs.existsSync(out)) continue;
  await (width > 1600 ? s.resize(1600) : s).toFile(out);
}
fs.copyFileSync(dir + 'coach--logo-white-coral.svg', 'public/logo-white.svg');
fs.copyFileSync(dir + 'coach--logo-main.svg', 'public/logo.svg');
console.log('done', Object.keys(map).length);
