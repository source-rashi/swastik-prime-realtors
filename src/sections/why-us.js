import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initWhyUs() {
  const sec = document.getElementById('why-us');
  sec.innerHTML = `
    <div class="container">

      <!-- Header -->
      <div style="text-align:center;max-width:600px;margin:0 auto 100px;">
        <div class="t-overline will-reveal" style="justify-content:center;margin-bottom:20px;">Why Swastik Prime</div>
        <h2 class="t-display-sm will-reveal">Authority built on<br/><em class="t-italic">real partnerships.</em></h2>
      </div>

      <!-- Stats row -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--cream-mid);margin-bottom:100px;" class="will-reveal">
        ${[
          ['500+','Projects<br/>Advised'],
          ['5+','Years of<br/>Expertise'],
          ['₹200Cr+','Total Value<br/>Advised'],
          ['50+','Corporate<br/>Clients'],
        ].map(([n,l])=>`
          <div style="background:var(--cream);padding:48px 40px;text-align:center;">
            <div style="font-family:'Playfair Display',serif;font-size:48px;font-weight:500;color:var(--teal);margin-bottom:12px;" class="count-el" data-target="${parseInt(n)}" data-raw="${n}">${n}</div>
            <div class="t-label" style="line-height:1.8;">${l}</div>
          </div>
        `).join('')}
      </div>

      <!-- Feature grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        ${[
          {icon:'◈',title:'5+ Years of Expertise',desc:'Deep-rooted knowledge of Central India\'s property micro-markets — Indore, Bhopal, Jabalpur, and beyond. We know every corridor, every emerging pocket.'},
          {icon:'◆',title:'Clifton Group & NRK Group',desc:'Trusted by India\'s leading corporate conglomerates for land acquisition, warehousing, and built-to-suit development projects.'},
          {icon:'◉',title:'Swastik Group Backbone',desc:'Backed by Swastik Group\'s EPC division, private freight terminal, and logistics network. End-to-end capability under one roof.'},
          {icon:'◇',title:'Timely Delivery',desc:'Zero-delay project timelines backed by in-house construction and project management expertise built over decades.'},
        ].map(f=>`
          <div class="card card--teal-top will-reveal" style="padding:40px 36px;">
            <div style="font-size:22px;color:var(--teal);margin-bottom:20px;">${f.icon}</div>
            <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:500;color:var(--charcoal);margin-bottom:12px;">${f.title}</div>
            <p style="font-size:14px;color:var(--charcoal-60);line-height:1.8;">${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  gsap.to('#why-us .will-reveal', {
    opacity:1, y:0, duration:0.9, ease:'power3.out', stagger:0.1,
    scrollTrigger:{ trigger:'#why-us', start:'top 70%' }
  });

  // Count up
  ScrollTrigger.create({
    trigger: '.count-el', start: 'top 80%', once: true,
    onEnter: () => {
      document.querySelectorAll('.count-el').forEach(el => {
        const target = parseInt(el.dataset.target);
        const raw = el.dataset.raw;
        const prefix = raw.startsWith('₹') ? '₹' : '';
        const suffix = raw.includes('+') ? '+' : raw.includes('Cr') ? 'Cr+' : '';
        let cur = 0;
        const step = target / 55;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = prefix + Math.floor(cur) + suffix;
        }, 22);
      });
    }
  });
}
