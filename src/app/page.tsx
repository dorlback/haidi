'use client';
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { TooltipItem } from 'chart.js';

// Chosen Palette: Warm Neutrals with Red Accent
// Application Structure Plan: A task-oriented, step-by-step guide mirroring the user's journey from planning to eating. The structure uses thematic sections (Plan, Build Hot Pot, Master Sauce, Pro Hacks) navigated via a top bar. This is more intuitive and engaging than a linear report summary, as it allows users to actively 'design' their visit. Key interactions include a soup cost-comparison chart, an ingredient explorer, and an interactive sauce recipe book to make complex information digestible and actionable.
// Visualization & Content Choices: 1. Soup Cost Comparison: Report data on 1/2/4-pot pricing -> Goal: Compare/Persuade -> Viz: Bar Chart -> Interaction: Visually show cost-effectiveness -> Justification: A chart is more impactful than a table for comparing prices -> Library: Chart.js. 2. Sauce Recipes: Report data on popular sauce formulas -> Goal: Instruct/Organize -> Viz: Interactive Cards -> Interaction: Click to reveal recipe details -> Justification: Hides complexity, allows users to focus on one recipe at a time. 3. Pro Food Hacks: Report info on DIY Menbosha etc. -> Goal: Inspire/Instruct -> Viz: Step-by-step illustrated cards -> Interaction: Click to expand -> Justification: Breaks down a creative process into simple, engaging steps. All interactions are designed to transform passive reading into active exploration.
// CONFIRMATION: NO SVG graphics used. NO Mermaid JS used.

// const branchData = [
//   { name: '명동점', address: '서울 중구 명동3길 36', hours: '10:00 ~ 05:00' },
//   { name: '강남점', address: '서울 서초구 서초대로 77길 54', hours: '10:00 ~ 07:00' },
//   { name: '홍대점', address: '서울 마포구 양화로 176', hours: '10:00 ~ 05:00' },
//   { name: '건대점', address: '서울 광진구 능동로 110', hours: '10:00 ~ 05:00' },
// ];

// const ingredientsData: Record<'soup' | 'meat' | 'seafood' | 'etc', { name: string; desc: string; icon: string }[]> = {
//   soup: [
//     { name: '청유마라훠궈 (홍탕)', desc: '얼얼하고 매운 사천 정통의 맛. 매운맛, 얼얼함 조절 가능. 우삼겹과 찰떡궁합!', icon: '🌶️' },
//     { name: '토마토탕', desc: '새콤달콤 감칠맛 폭발! 매운 것을 못 먹는 사람에게 강력 추천. 해장용으로도 최고.', icon: '🍅' },
//     { name: '삼선탕 (백탕)', desc: '순하고 담백한 맛. 훠궈 초보자나 재료 본연의 맛을 즐기고 싶을 때 좋은 선택.', icon: '🍲' },
//     { name: '버섯탕', desc: '다양한 버섯의 깊고 향긋한 풍미. 채소류와 특히 잘 어울립니다.', icon: '🍄' },
//     { name: '맑은 탕', desc: '무료 또는 최소 비용. 4칸 주문 시 비용 절약용으로 활용. 국자 헹굼용으로도 유용.', icon: '💧' },
//   ],
//   meat: [
//     { name: '우삼겹', desc: '기름지고 고소한 맛으로 홍탕과 특히 잘 어울리는 인기 메뉴.', icon: '🥩' },
//     { name: '목살', desc: '담백한 살코기를 선호하는 분들에게 추천하는 부위.', icon: '🍖' },
//     { name: '특제 소고기', desc: '두께감이 있어도 입에서 살살 녹는 부드러운 식감이 일품.', icon: '✨' },
//   ],
//   seafood: [
//     { name: '새우 완자', desc: '모든 사람이 추천하는 필수 주문 메뉴! 직원이 직접 만들어 넣어주어 탱글한 식감이 살아있습니다.', icon: '🍤' },
//     { name: '갑오징어 완자', desc: '쫄깃한 식감과 풍부한 맛으로 새우 완자와 쌍벽을 이루는 인기 메뉴.', icon: '🦑' },
//   ],
//   etc: [
//     { name: '두유피', desc: '일반 두부피와 다른 야들야들하고 부드러운 독특한 식감. 꼭 한번 시도해보세요.', icon: '📜' },
//     { name: '고구마 당면', desc: '쫄깃한 식감으로 훠궈의 맛을 한층 더 풍부하게 만들어줍니다.', icon: '🍠' },
//     { name: '쿵푸면 (생면)', desc: '면을 주문하면 직원이 테이블에서 화려한 수타면 퍼포먼스를 보여줍니다. 맛과 재미를 동시에!', icon: '🍜' },
//     { name: '계란 국수', desc: '토마토탕에 날계란을 풀어 함께 끓여 먹으면 극락의 맛을 경험할 수 있습니다.', icon: '🥚' },
//   ],
// };

const sauceRecipes = [
  {
    name: "건희 소스 (클래식)",
    desc: "가장 유명하고 대중적인 맛. 달콤, 고소, 짭짤함의 완벽한 균형으로 누구나 좋아할 만한 소스입니다.",
    ingredients: [
      "땅콩 소스: 1스푼", "칠리 소스: 2.5스푼", "다진 마늘: 0.5스푼", "다진 파: 0.5스푼",
      "깨: 1스푼", "땅콩 가루: 1스푼", "고춧가루: 0.5스푼", "고추기름: 1스푼",
      "설탕: 0.3스푼", "볶음 소고기장: 0.5스푼"
    ]
  },
  {
    name: "이영지 소스 (매콤)",
    desc: "강렬하고 매콤한 맛을 즐기는 분들을 위한 소스. 풍부한 재료가 어우러져 중독성 있는 맛을 냅니다.",
    ingredients: [
      "땅콩 소스: 2국자", "스위트 칠리: 1.5국자", "태국 고추: 2숟갈", "고춧가루: 1.5숟갈",
      "다진 파: 1.5숟갈", "다진 마늘: 1숟갈", "참기름: 2바퀴", "간장: 1바퀴", "다진 고기: 1.5숟갈"
    ]
  },
  {
    name: "마크 소스 (감칠맛)",
    desc: "고기와의 궁합이 완벽한 소스. 굴소스의 감칠맛과 마늘향이 고기의 풍미를 한껏 끌어올립니다.",
    ingredients: [
      "땅콩 소스: 2국자", "다진 마늘: 1.5숟갈", "양파: 1.5숟갈", "굴 소스: 1숟갈",
      "태국 고추: 1숟갈", "간장: 2숟갈", "다진 고기/파/땅콩가루: 조금씩"
    ]
  },
  {
    name: "기본 참깨 소스 (고소)",
    desc: "훠궈 초보자에게 가장 무난한 선택. 재료 본연의 맛을 살려주는 고소하고 부드러운 맛입니다.",
    ingredients: [
      "참깨 소스: 듬뿍", "다진 마늘: 약간", "다진 파: 약간", "고수(선택): 약간"
    ]
  }
];

const hacksData = [
  {
    title: "DIY 멘보샤 만들기",
    desc: "유타오(튀김빵)와 새우완자로 만드는 초호화 별미! 바삭함과 육즙을 동시에 느낄 수 있습니다.",
    icon: "🥪",
    steps: ["1. 유타오를 반으로 자른다.", "2. 안에 새우 완자를 채운다.", "3. 우삼겹으로 전체를 감싼다.", "4. 훠궈 탕에 익혀 먹는다."]
  },
  {
    title: "토마토탕 + 계란국수",
    desc: "상상 이상의 꿀조합! 크리미하고 고소한 맛이 일품이며 해장용으로도 강력 추천합니다.",
    icon: "🍝",
    steps: ["1. 토마토탕에 날계란을 푼다.", "2. 계란 국수를 넣어 익힌다.", "3. 부드러운 '토마토 에그 누들' 완성!"]
  },
  {
    title: "돼지고기 튀김",
    desc: "애피타이저로 강력 추천하는 메뉴. 겉은 바삭, 속은 촉촉한 튀김을 고춧가루에 찍어 드셔보세요.",
    icon: "🐖",
    steps: ["훠궈가 나오기 전 주문하여 입맛을 돋우는 것이 팁!"]
  },
  {
    title: "쿵푸면 쇼",
    desc: "'특제면'을 주문하면 테이블에서 펼쳐지는 화려한 수타면 퍼포먼스를 즐길 수 있습니다.",
    icon: "🤸",
    steps: ["맛과 재미, 두 마리 토끼를 모두 잡는 최고의 경험!"]
  },
  {
    title: "연유빵 / 꽃빵",
    desc: "매콤한 훠궈를 먹은 후 입안을 달래줄 완벽한 디저트. 달콤하고 부드러운 맛이 일품입니다.",
    icon: "🍞",
    steps: ["따뜻할 때 연유에 푹 찍어 드세요."]
  },
];

function App() {
  // const [activeIngredientTab, setActiveIngredientTab] = useState<'soup' | 'meat' | 'seafood' | 'etc'>('soup');
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [activeNavSection, setActiveNavSection] = useState('intro');
  const potChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null); // To store Chart.js instance

  // Chart.js initialization
  useEffect(() => {
    if (potChartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart if any
      }
      const ctx = potChartRef.current.getContext('2d');
      if (!ctx) return;
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['마라탕', '토마토탕', '삼선탕', '버섯탕'],
          datasets: [
            {
              label: '1칸 주문 시',
              data: [24000, 24000, 18000, 22000],
              backgroundColor: 'rgba(200, 200, 200, 0.6)',
              borderColor: 'rgba(200, 200, 200, 1)',
              borderWidth: 1
            },
            {
              label: '4칸 주문 시 (탕 1개당 가격)',
              data: [9000, 9000, 6000, 7000],
              backgroundColor: 'rgba(197, 48, 48, 0.6)',
              borderColor: 'rgba(197, 48, 48, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: { display: true, text: '탕 종류별 주문 방식에 따른 가격 비교 (원)' },
            tooltip: {
              callbacks: {
                label: function (context: TooltipItem<'bar'>) {
                  let label = context.dataset.label ?? '';
                  if (label) { label += ': '; }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('ko-KR').format(Number(context.parsed.y)) + '원';
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value: string | number) {
                  return new Intl.NumberFormat('ko-KR').format(typeof value === 'string' ? parseFloat(value) : value);
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Intersection Observer for navigation highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('main section');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavSection(entry.target.id);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleMobileNavChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setActiveNavSection(id.substring(1)); // Update state for active highlighting
    window.location.hash = id; // Scroll to section
  };

  return (
    <div className="bg-stone-50 text-stone-800">
      <style>
        {`
                body { font-family: 'Noto Sans KR', sans-serif; scroll-behavior: smooth; }
                .nav-link { transition: all 0.3s; }
                .nav-link.active { color: #C53030; border-bottom-color: #C53030; }
                .content-section { display: none; }
                .content-section.active { display: block; }
                .chart-container { position: relative; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; height: 300px; max-height: 400px; }
                @media (min-width: 768px) { .chart-container { height: 350px; } }
                .tab-button.active { background-color: #C53030; color: white; }
                .recipe-card.active { border-color: #C53030; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                `}
      </style>

      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍲</span>
              <h1 className="text-xl font-bold text-red-800">하이디라오 완전정복</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#intro" className={`nav-link px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-700 border-b-2 border-transparent ${activeNavSection === 'intro' ? 'active' : ''}`}>소개</a>
              <a href="#plan" className={`nav-link px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-700 border-b-2 border-transparent ${activeNavSection === 'plan' ? 'active' : ''}`}>1. 계획 & 예약</a>
              <a href="#build" className={`nav-link px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-700 border-b-2 border-transparent ${activeNavSection === 'build' ? 'active' : ''}`}>2. 훠궈 만들기</a>
              <a href="#sauce" className={`nav-link px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-700 border-b-2 border-transparent ${activeNavSection === 'sauce' ? 'active' : ''}`}>3. 소스 마스터</a>
              <a href="#hacks" className={`nav-link px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-700 border-b-2 border-transparent ${activeNavSection === 'hacks' ? 'active' : ''}`}>4. 고수들의 꿀팁</a>
              <a href="#checklist" className={`nav-link px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-700 border-b-2 border-transparent ${activeNavSection === 'checklist' ? 'active' : ''}`}>5. 최종 체크리스트</a>
            </div>
            <div className="md:hidden">
              <select id="mobile-nav" className="bg-white border border-stone-300 rounded-md px-2 py-1 text-sm" onChange={handleMobileNavChange} value={`#${activeNavSection}`}>
                {/* <option value="#intro">소개</option> */}
                {/* <option value="#plan">1. 계획 & 예약</option> */}
                {/* <option value="#build">훠궈 만들기</option> */}
                <option value="#sauce">소스 조합</option>
                <option value="#hacks">고수들의 꿀팁</option>
                {/* <option value="#checklist">5. 최종 체크리스트</option> */}
              </select>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 md:p-8">

        {/* <section id="intro" className="scroll-mt-20 text-center py-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">훠궈, 그 이상의 경험</h2>
          <p className="max-w-3xl mx-auto text-lg text-stone-600 mb-8">하이디라오는 단순한 식당이 아닙니다. 최상의 맛은 물론, 상상을 초월하는 고객 서비스로 잊지 못할 추억을 선사하는 &apos;경험 중심의 다이닝&apos; 공간입니다. 이 가이드와 함께 하이디라오의 모든 것을 100% 즐겨보세요.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-4xl mb-2">😋</p>
              <h3 className="text-xl font-semibold mb-2">정통의 맛</h3>
              <p className="text-stone-600">취향에 맞게 조합하는 다채로운 탕과 신선한 재료들</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-4xl mb-2">💅</p>
              <h3 className="text-xl font-semibold mb-2">감동의 서비스</h3>
              <p className="text-stone-600">기다림마저 즐거운 네일아트, 구두닦이 등 무료 서비스</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-4xl mb-2">🍜</p>
              <h3 className="text-xl font-semibold mb-2">즐거운 경험</h3>
              <p className="text-stone-600">눈앞에서 펼쳐지는 쿵푸면 쇼 등 다채로운 볼거리</p>
            </div>
          </div>
        </section> */}

        {/* <section id="plan" className="scroll-mt-20 py-16">
          <h2 className="text-3xl font-bold text-center mb-2">Step 1: 계획 & 예약</h2>
          <p className="text-lg text-stone-600 text-center mb-12">원활한 하이디라오 경험의 첫걸음은 철저한 계획에서 시작됩니다. 인기 지점은 예약이 필수이며, 기다리는 시간조차 특별한 서비스와 함께 즐길 수 있습니다.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">예약은 필수!</h3>
              <p className="text-stone-600 mb-4">피크 타임에는 대기 시간이 길어질 수 있으니 네이버 예약, 캐치테이블 등을 통해 미리 예약하세요. 최소 1-2주 전 예약을 추천합니다.</p>
              <div id="branch-info" className="space-y-4">
                {branchData.map((branch, index) => (
                  <div key={index} className="border-t pt-4">
                    <h4 className="font-semibold">{branch.name}</h4>
                    <p className="text-sm text-stone-500">{branch.address}</p>
                    <p className="text-sm text-stone-500">영업시간: {branch.hours}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">기다림의 즐거움</h3>
              <p className="text-stone-600 mb-6">하이디라오에서는 대기 시간도 특별한 경험의 일부입니다. 아래 서비스들을 마음껏 즐겨보세요.</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl mt-1">💅</span>
                  <div>
                    <h4 className="font-semibold">무료 네일 서비스</h4>
                    <p className="text-sm text-stone-500">대기 등록 시 예약 가능. 젤네일, 케어 등 전문가의 서비스를 받아보세요.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl mt-1">🍿</span>
                  <div>
                    <h4 className="font-semibold">무제한 스낵 & 음료</h4>
                    <p className="text-sm text-stone-500">다양한 과자, 과일, 음료를 즐기며 지루할 틈 없이 기다릴 수 있습니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl mt-1">👟</span>
                  <div>
                    <h4 className="font-semibold">구두닦이 서비스</h4>
                    <p className="text-sm text-stone-500">식사하는 동안 구두를 맡기면 반짝반짝하게 닦아드립니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl mt-1">🧸</span>
                  <div>
                    <h4 className="font-semibold">어린이 놀이방</h4>
                    <p className="text-sm text-stone-500">아이들이 안전하게 놀 수 있는 공간이 마련되어 있어 가족 외식에 안성맞춤입니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section id="build" className="scroll-mt-20 py-16">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">가성비 최고의 선택: 4칸 탕 전략</h3>
            <p className="text-center text-stone-600 mb-6">다양한 맛을 즐기면서 비용까지 절약하는 비법! 4칸 탕을 선택하고 일부를 무료인 '맑은 탕'으로 채우면, 맛있는 탕을 개별로 주문하는 것보다 훨씬 저렴해집니다. 아래 차트에서 가격 차이를 직접 확인해보세요.</p>
            <div className="chart-container">
              <canvas ref={potChartRef}></canvas>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">탕 베이스 & 추천 재료 탐험</h3>
            <div className="flex justify-center mb-6 border-b">
              {Object.keys(ingredientsData).map(category => (
                <button
                  key={category}
                  className={`ingredient-tab-button tab-button py-2 px-4 text-lg font-medium border-b-2 border-transparent ${activeIngredientTab === category ? 'active' : ''}`}
                  onClick={() => setActiveIngredientTab(category as 'soup' | 'meat' | 'seafood' | 'etc')}
                >
                  {category === 'soup' ? '탕 베이스' : category === 'meat' ? '육류' : category === 'seafood' ? '해산물/완자' : '채소/기타'}
                </button>
              ))}
            </div>
            <div id="ingredient-content" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredientsData[activeIngredientTab].map((item: { name: string; desc: string; icon: string }, index: number) => (
                <div key={index} className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                  </div>
                  <p className="text-stone-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section id="sauce" className="scroll-mt-20 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">소스 조합</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4" id="recipe-list">
              {sauceRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className={`recipe-card bg-white p-4 rounded-lg shadow-sm border-2 border-transparent cursor-pointer hover:border-red-700 transition ${selectedRecipeIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedRecipeIndex(index)}
                >
                  <h4 className="font-bold text-lg">{recipe.name}</h4>
                  <p className="text-sm text-stone-500">{recipe.desc.split('.')[0]}.</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 id="recipe-title" className="text-2xl font-bold mb-4">{sauceRecipes[selectedRecipeIndex].name}</h3>
              <p id="recipe-description" className="text-stone-600 mb-6">{sauceRecipes[selectedRecipeIndex].desc}</p>
              <ul id="recipe-ingredients" className="space-y-2 text-stone-700">
                {sauceRecipes[selectedRecipeIndex].ingredients.map((ing, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-500 mr-2">▪</span> {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="hacks" className="scroll-mt-20 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">하이디라오 꿀팁</h2>
          <div id="hacks-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hacksData.map((hack, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-4">{hack.icon}</span>
                  <h3 className="text-xl font-semibold">{hack.title}</h3>
                </div>
                <p className="text-stone-600 mb-4 flex-grow">{hack.desc}</p>
                <ul className="list-disc list-inside space-y-1">
                  {hack.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-stone-600">{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* <section id="checklist" className="scroll-mt-20 py-16">
          <h2 className="text-3xl font-bold text-center mb-2">Step 5: 최종 체크리스트</h2>
          <p className="text-lg text-stone-600 text-center mb-12">완벽한 하이디라오 경험을 위한 마지막 점검! 아래 핵심 사항들을 기억하고 최고의 만족을 느껴보세요.</p>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✔</span>
                <div><strong className="font-semibold">사전 계획:</strong> 피크 타임 방문 시, 온라인 예약은 선택이 아닌 필수입니다.</div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✔</span>
                <div><strong className="font-semibold">서비스 활용:</strong> 네일아트, 스낵바 등 무료 서비스를 마음껏 즐기며 기다리세요.</div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✔</span>
                <div><strong className="font-semibold">가성비 탕 조합:</strong> 4칸 탕 + 맑은 탕 조합으로 다양성과 비용 효율을 모두 잡으세요.</div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✔</span>
                <div><strong className="font-semibold">소스 마스터:</strong> 건희 소스와 같은 인기 레시피로 시작해 나만의 소스를 만들어보세요.</div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✔</span>
                <div><strong className="font-semibold">필수 메뉴 탐험:</strong> 새우 완자, DIY 멘보샤, 쿵푸면은 놓치지 말아야 할 시그니처입니다.</div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✔</span>
                <div><strong className="font-semibold">직원과 소통:</strong> 도움이 필요하거나 추천을 원할 땐 언제든 친절한 직원에게 문의하세요.</div>
              </li>
            </ul>
          </div>
        </section> */}

      </main>

      {/* <footer className="bg-stone-800 text-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          <p>&copy; 2025 하이디라오 인터랙티브 가이드. 모든 정보는 제공된 보고서를 기반으로 제작되었습니다.</p>
        </div>
      </footer> */}
    </div>
  );
}

export default App;