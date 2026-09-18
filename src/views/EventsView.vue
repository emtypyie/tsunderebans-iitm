<template>
  <div class="events-root">
    <main class="events-main">

      <!-- CAMPUS HERO BANNER -->
      <section class="hero-banner">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-badge">LEARN / CONNECT / GROW</div>
          <h1 class="hero-title">Events &amp;<br>Workshops</h1>
          <p class="hero-subtitle">
            Hands-on tech bootcamps, speaker sessions, and regional community meetups.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="activeTab = 'upcoming'">Explore Events</button>
            <button class="btn-secondary" @click="openProposalModal">Suggest Event</button>
          </div>
        </div>
      </section>

      <!-- TAB SWITCHER -->
      <div class="tab-wrapper">
        <button 
          :class="['tab-btn', activeTab === 'upcoming' ? 'tab-active' : 'tab-inactive']"
          @click="activeTab = 'upcoming'"
        >
          Upcoming Events
        </button>
        <button 
          :class="['tab-btn', activeTab === 'past' ? 'tab-active' : 'tab-inactive']"
          @click="activeTab = 'past'"
        >
          Past Events
        </button>
      </div>

      <!-- UPCOMING SECTION -->
      <section v-show="activeTab === 'upcoming'" class="events-section">
        <div class="section-header">
          <div class="title-row">
            <h2 class="section-title">Upcoming <span>Events</span></h2>
            <div class="title-line"></div>
          </div>
          <p class="section-subtitle">Upcoming hands-on workshops and discussions. Click to register.</p>
        </div>

        <div class="cards-grid">
          <article 
            v-for="(ev, idx) in upcomingEvents" 
            :key="idx" 
            class="split-card"
            @click="openModal(ev)"
          >
            <div class="card-left">
              <div>
                <span class="pill pill-green">{{ ev.category }}</span>
                <h3 class="card-title">{{ ev.title }}</h3>
              </div>
              <div class="card-meta">
                <div class="meta-item"><Calendar :size="12" class="gold-icon" /> {{ ev.date }}</div>
                <div class="meta-item"><Clock :size="12" class="gold-icon" /> {{ ev.time }}</div>
                <div class="meta-item"><MapPin :size="12" class="gold-icon" /> {{ ev.location }}</div>
              </div>
            </div>
            <div class="card-right">
              <img :src="ev.img" :alt="ev.title" />
              <div class="card-arrow-btn">
                <ArrowRight :size="14" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- PAST SECTION -->
      <section v-show="activeTab === 'past'" class="events-section">
        <div class="section-header">
          <div class="title-row">
            <h2 class="section-title">Past <span>Events</span></h2>
            <div class="title-line"></div>
          </div>
          <p class="section-subtitle">Recorded sessions and highlights. Click any card to watch on YouTube.</p>
        </div>

        <div class="cards-grid">
          <article 
            v-for="(p, idx) in pastEvents" 
            :key="idx" 
            class="split-card"
            @click="openYoutube(p.ytUrl)"
          >
            <div class="card-left">
              <div>
                <span class="pill pill-red">
                  <Play :size="9" class="fill-red" /> {{ p.badge }}
                </span>
                <h3 class="card-title">{{ p.title }}</h3>
              </div>
              <div class="card-meta">
                <div class="meta-item"><Calendar :size="12" class="gold-icon" /> {{ p.date }}</div>
                <div class="meta-item"><Youtube :size="12" class="red-icon" /> <span class="dim">{{ p.actionText }}</span></div>
                <div class="meta-item"><MapPin :size="12" class="gold-icon" /> {{ p.location }}</div>
              </div>
            </div>
            <div class="card-right">
              <img :src="p.img" :alt="p.title" />
              <div class="card-arrow-btn past-arrow">
                <Play :size="13" class="fill-curr" />
              </div>
            </div>
          </article>
        </div>
      </section>

    </main>

    <!-- EVENT MODAL -->
    <div v-if="isModalOpen" class="modal-backdrop">
      <div class="modal-card">
        <button class="modal-close-btn" @click="isModalOpen = false">
          <X :size="18" />
        </button>
        <span class="pill pill-gold">{{ activeModalEvent.category }}</span>
        <h3 class="modal-title">{{ activeModalEvent.title }}</h3>
        <p class="modal-desc">{{ activeModalEvent.desc }}</p>

        <div class="modal-info-box">
          <div><div class="info-lbl">Date</div><div class="info-val">{{ activeModalEvent.date }}</div></div>
          <div><div class="info-lbl">Time</div><div class="info-val">{{ activeModalEvent.time }}</div></div>
          <div><div class="info-lbl">Location</div><div class="info-val truncate">{{ activeModalEvent.location }}</div></div>
        </div>

        <form @submit.prevent="submitForm" class="modal-form">
          <label>Student Roll / Email ID</label>
          <input type="text" required placeholder="22f100xxxx@ds.study.iitm.ac.in" />
          <button type="submit" class="submit-btn">Confirm RSVP</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Calendar, Clock, MapPin, Play, Youtube, ArrowRight, X } from 'lucide-vue-next';

const activeTab = ref('past');

const upcomingEvents = ref([
  {
    title: 'Machine Learning Hands-on Workshop',
    category: 'Workshop',
    date: '19 Sep 2026',
    time: '4:00 PM - 6:00 PM',
    location: 'Online (Google Meet)',
    desc: 'Hands-on practical session covering deep learning and model evaluation.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'From IITM BS to Real World Impact',
    category: 'Talk',
    date: '27 Sep 2026',
    time: '6:00 PM - 7:30 PM',
    location: 'IITM / Online',
    desc: 'Fireside speaker talk with alumni on career roadmaps and real-world project development.',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Sundarbans City Meetup – Gwalior',
    category: 'Meetup',
    date: '20 Sep 2026',
    time: '3:30 PM Onwards',
    location: 'Chai Kaapi, Gwalior',
    desc: 'Casual offline regional house meetup over chai and tech discussions.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  }
]);

const pastEvents = ref([
  
  {
    title: 'Career in Research',
    badge: 'Recording',
    date: 'May 2026',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'Bengaluru Student meetup',
    badge: 'Recording',
    date: 'May 2026',
    actionText: 'Watch Recording',
    location: 'Talk over tables cafe',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911324/sundarbans/public/assets/pastevent/bengaluru_meetup_608_1.png'
  },
  {
    title: 'Delhi Meetup 2026',
    badge: 'Recording',
    date: 'April 2026',
    actionText: 'Watch Recording',
    location: 'Delhi',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'Chennai Meetup 2026',
    badge: 'Recording',
    date: 'March 2026',
    actionText: 'Watch Recording',
    location: 'Chennai',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'Shakti Series — Episode 1',
    badge: 'Recording',
    date: 'October 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'Navrang 2.0 — Celebrate Navratri',
    badge: 'Recording',
    date: 'September 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1567591370762-b3db2e82eb3e?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'Pre-Independence Day Session',
    badge: 'Recording',
    date: 'August 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'Paradox Champions League — Football Faceoff',
    badge: 'Recording',
    date: 'May 2025',
    actionText: 'Watch Recording',
    location: 'Offline',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911324/sundarbans/public/assets/pastevent/2025-05-15_12-44-00_UTC.jpg'
  },
  {
    title: 'Ghost in the Firewall',
    badge: 'Recording',
    date: 'May 2025',
    actionText: 'Watch Recording',
    location: 'Offline',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911323/sundarbans/public/assets/pastevent/2025-05-14_08-34-35_UTC.jpg'
  },
  {
    title: 'Hack Eclipse — 24-hour Hackathon',
    badge: 'Recording',
    date: 'May 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911322/sundarbans/public/assets/pastevent/2025-05-09_06-25-51_UTC.jpg'
  },
  {
    title: 'Paradox Badminton League 2.0',
    badge: 'Recording',
    date: 'May 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'IPL Auction Showdown',
    badge: 'Recording',
    date: 'May 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://images.unsplash.com/photo-1540747913346-19212a4f3b1e?w=500&q=80&auto=format&fit=crop'
  },
  {
    title: 'FrameQuest — Photography Contest',
    badge: 'Recording',
    date: 'February 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911320/sundarbans/public/assets/pastevent/2025-02-10_10-25-33_UTC.jpg'
  },
  {
    title: 'Into the Shadows — Special Forces Talk',
    badge: 'Recording',
    date: 'February 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911321/sundarbans/public/assets/pastevent/2025-02-13_02-15-54_UTC.jpg'
  },
  {
    title: 'Python Odyssey',
    badge: 'Recording',
    date: 'February 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911319/sundarbans/public/assets/pastevent/2025-02-06_00-30-44_UTC.jpg'
  },
  {
    title: 'Mahabharata — Science Meets History',
    badge: 'Recording',
    date: 'January 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911318/sundarbans/public/assets/pastevent/2025-01-27_08-57-27_UTC.jpg'
  },
  {
    title: 'Frames of Freedom — Republic Day Photography',
    badge: 'Recording',
    date: 'January 2025',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911317/sundarbans/public/assets/pastevent/2025-01-25_01-20-01_UTC.jpg'
  },
  {
    title: 'Navodaya — Voices of Power with Smriti Irani',
    badge: 'Recording',
    date: 'December 2024',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911316/sundarbans/public/assets/pastevent/2024-12-05_11-31-48_UTC.jpg'
  },
  {
    title: 'Dinkar Ki Pratiksha — Open Mic',
    badge: 'Recording',
    date: 'September 2024',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911315/sundarbans/public/assets/pastevent/2024-09-23_06-54-49_UTC.jpg'
  },
  {
    title: 'Sundarbans BS Talent Show',
    badge: 'Recording',
    date: 'July 2024',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911314/sundarbans/public/assets/pastevent/2024-07-16_11-41-17_UTC.jpg'
  },
  {
    title: 'How to Improve Concentration — Swami Mukundanand',
    badge: 'Recording',
    date: 'March 2023',
    actionText: 'Watch Recording',
    location: 'Virtual',
    ytUrl: '#',
    img: 'https://res.cloudinary.com/l59gy0g2/image/upload/f_auto,q_auto:good,w_1000,c_limit/v1785911313/sundarbans/public/assets/pastevent/2023-03-22_09-54-19_UTC.jpg'
  }

]);

const isModalOpen = ref(false);
const activeModalEvent = ref({});

function openModal(ev) {
  activeModalEvent.value = ev;
  isModalOpen.value = true;
}

function openProposalModal() {
  openModal({
    title: 'Suggest a Community Event',
    category: 'Proposal',
    date: 'Flexible',
    time: 'Flexible',
    location: 'IITM Online',
    desc: 'Submit your ideas and proposals for Sundarbans events.'
  });
}

function openYoutube(url) {
  if (url) window.open(url, '_blank');
}

function submitForm() {
  isModalOpen.value = false;
  alert('RSVP confirmed successfully!');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

.events-root {
  min-height: 100vh;
  background-color: #040907;
  background-image: 
    radial-gradient(circle at 45% 0%, rgba(22, 60, 42, 0.4) 0%, transparent 45%),
    radial-gradient(circle at 50% 25%, rgba(229, 168, 66, 0.04) 0%, transparent 40%),
    radial-gradient(circle at 85% 70%, rgba(16, 45, 32, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 10% 85%, rgba(8, 25, 18, 0.5) 0%, transparent 45%);
  color: #e5e7eb;
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding-bottom: 3rem;
}

.events-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

/* HERO BANNER - Exact match for Image 2 */
.hero-banner {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 380px;
  background-color: #040907;
  border: 1px solid rgba(229, 168, 66, 0.16);
  box-shadow: 0 20px 45px -12px rgba(0, 0, 0, 0.9);
  padding: 0 3.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Text ko center mein aane se rokega */
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(to right, rgba(4, 9, 7, 0.96) 0%, rgba(4, 9, 7, 0.78) 42%, rgba(4, 9, 7, 0.5) 100%),
    linear-gradient(to bottom, rgba(4, 9, 7, 0.4) 0%, rgba(4, 9, 7, 0.85) 100%),
    url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center 65%; /* Event stage aur logo cut hone se bachega */
  filter: brightness(0.65) contrast(1.05); /* Extra brightness kam kar di */
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 520px;
  text-align: left; /* Strict left alignment */
  margin: 0;
}

.hero-badge {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.25em;
  color: #e5a842;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
}

.hero-subtitle {
  font-size: 0.88rem;
  color: rgba(240, 240, 240, 0.85);
  margin-top: 1.1rem;
  line-height: 1.55;
  font-weight: 300;
}

.hero-actions {
  display: flex;
  gap: 0.85rem;
  margin-top: 1.75rem;
}

.btn-primary {
  padding: 0.65rem 1.45rem;
  border-radius: 9999px;
  background-color: #f9f5ea;
  color: #06110c;
  font-size: 0.8rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0,0,0,0.3);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.95;
  transform: scale(1.02);
}

.btn-secondary {
  padding: 0.65rem 1.45rem;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.75);
  border-color: rgba(229, 168, 66, 0.5);
}

/* TABS */
.tab-wrapper {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 2.25rem 0 1.25rem;
}

.tab-btn {
  padding: 0.45rem 1.4rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-active {
  background-color: #e5a842;
  color: #000000;
  border: none;
  box-shadow: 0 4px 14px rgba(229, 168, 66, 0.35);
}

.tab-inactive {
  background-color: #091510;
  color: #d1d5db;
  border: 1px solid rgba(229, 168, 66, 0.25);
}

/* EVENTS SECTION */
.section-header {
  margin-bottom: 1.5rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.section-title span {
  color: #e5a842;
}

.title-line {
  height: 1px;
  width: 32px;
  background-color: rgba(229, 168, 66, 0.7);
  border-radius: 9999px;
}

.section-subtitle {
  font-size: 0.75rem;
  color: rgba(209, 213, 219, 0.7);
  margin-top: 0.3rem;
}

/* CARDS GRID */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.25rem;
}

.split-card {
  background: #06110c;
  border: 1px solid rgba(229, 168, 66, 0.16);
  border-radius: 14px;
  display: grid;
  grid-template-columns: 7fr 5fr;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.split-card:hover {
  border-color: rgba(229, 168, 66, 0.45);
  transform: translateY(-3px);
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(229, 168, 66, 0.12);
}

.card-left {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0.5rem 0 0;
  line-height: 1.3;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 1rem;
  font-size: 0.72rem;
  color: rgba(209, 213, 219, 0.85);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.card-right {
  position: relative;
  overflow: hidden;
  background: #000;
  min-height: 145px;
}

.card-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.split-card:hover .card-right img {
  transform: scale(1.05);
}

.card-arrow-btn {
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.2px solid rgba(229, 168, 66, 0.85);
  background: rgba(6, 17, 12, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5a842;
  transition: all 0.25s ease;
}

.split-card:hover .card-arrow-btn {
  background: #e5a842;
  color: #06110c;
  transform: scale(1.08);
}

.past-arrow {
  border-color: rgba(239, 68, 68, 0.8);
  color: #ef4444;
}

.split-card:hover .past-arrow {
  background: #dc2626 !important;
  color: #ffffff !important;
}

/* PILLS & ICONS */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  border: 1px solid transparent;
}

.pill-green {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(9, 32, 23, 0.8);
  color: #34d399;
}

.pill-red {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(69, 10, 10, 0.4);
  color: #f87171;
}

.pill-gold {
  border-color: rgba(229, 168, 66, 0.4);
  background: rgba(229, 168, 66, 0.1);
  color: #e5a842;
}

.gold-icon { color: #e5a842; }
.red-icon { color: #f87171; }
.fill-red { fill: #f87171; }
.fill-curr { fill: currentColor; }
.dim { color: #9ca3af; }

/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 5, 0.85);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-card {
  background: #081510;
  border: 1px solid rgba(229, 168, 66, 0.3);
  border-radius: 14px;
  padding: 1.5rem;
  max-width: 440px;
  width: 100%;
  position: relative;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
}

.modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  color: #ffffff;
  margin: 0.5rem 0 0.3rem;
}

.modal-desc {
  font-size: 0.75rem;
  color: rgba(209, 213, 219, 0.8);
  margin-bottom: 1rem;
}

.modal-info-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.6rem;
  margin-bottom: 1rem;
}

.info-lbl { font-size: 0.6rem; color: #9ca3af; text-transform: uppercase; }
.info-val { font-size: 0.72rem; color: #ffffff; font-weight: 600; margin-top: 2px; }

.modal-form label { display: block; font-size: 0.72rem; margin-bottom: 0.3rem; }
.modal-form input {
  width: 100%;
  background: #0d2018;
  border: 1px solid rgba(229, 168, 66, 0.2);
  border-radius: 6px;
  padding: 0.5rem;
  color: #fff;
  font-size: 0.75rem;
  margin-bottom: 0.8rem;
  outline: none;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 0.6rem;
  background: linear-gradient(90deg, #f5c66e, #e5a842);
  border: none;
  border-radius: 9999px;
  color: #000;
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
}
</style>