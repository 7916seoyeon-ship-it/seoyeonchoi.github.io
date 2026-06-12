// BooksTalk (북스토크) - SPA Application Script

// ==========================================
// 1. 초기 Mock 데이터 및 학과 데이터 정의
// ==========================================

const ACADEMIC_DATA = {
  "컴퓨터공학과": [
    { course: "자료구조 및 실습", professor: "김철수 교수" },
    { course: "알고리즘 개론", professor: "이영희 교수" },
    { course: "운영체제론", professor: "박민수 교수" },
    { course: "데이터베이스 시스템", professor: "최우재 교수" },
    { course: "컴퓨터 네트워크", professor: "정진우 교수" }
  ],
  "경영학과": [
    { course: "마케팅원론", professor: "홍길동 교수" },
    { course: "재무관리론", professor: "최다솜 교수" },
    { course: "조직행동론", professor: "강형욱 교수" },
    { course: "회계원리", professor: "박서현 교수" }
  ],
  "전자공학과": [
    { course: "회로이론", professor: "정우성 교수" },
    { course: "신호 및 시스템", professor: "한효주 교수" },
    { course: "전자기학", professor: "이정재 교수" },
    { course: "디지털시스템설계", professor: "고수 교수" }
  ],
  "기계공학과": [
    { course: "열역학", professor: "백윤식 교수" },
    { course: "유체역학", professor: "성동일 교수" },
    { course: "재료인장시험", professor: "김희원 교수" }
  ]
};

// CSS 북 커버 스타일 프리셋 (랜덤 북커버 생성용)
const COVER_PRESETS = [
  { bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', text: '#ffffff' }, // Blue
  { bg: 'linear-gradient(135deg, #311042 0%, #701a75 100%)', text: '#ffffff' }, // Purple
  { bg: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)', text: '#ffffff' }, // Emerald
  { bg: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)', text: '#ffffff' }, // Orange
  { bg: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)', text: '#ffffff' }, // Violet
  { bg: 'linear-gradient(135deg, #881337 0%, #f43f5e 100%)', text: '#ffffff' }  // Rose
];

// 초기 사용자 데이터
const INITIAL_USERS = [
  { id: "admin@univ.ac.kr", nickname: "북스토크운영진", univEmail: "admin@univ.ac.kr", passwordHash: "1234", isVerified: true },
  { id: "comgong@univ.ac.kr", nickname: "컴공학부고수", univEmail: "comgong@univ.ac.kr", passwordHash: "1234", isVerified: true },
  { id: "bizking@univ.ac.kr", nickname: "경영학도은우", univEmail: "bizking@univ.ac.kr", passwordHash: "1234", isVerified: true },
  { id: "circuits@univ.ac.kr", nickname: "회로설계장인", univEmail: "circuits@univ.ac.kr", passwordHash: "1234", isVerified: true }
];

// 초기 책 데이터
const INITIAL_BOOKS = [
  {
    id: "book-1",
    sellerId: "comgong@univ.ac.kr",
    title: "알고리즘 개론 (Introduction to Algorithms)",
    author: "Thomas H. Cormen",
    deptName: "컴퓨터공학과",
    courseName: "알고리즘 개론",
    profName: "이영희 교수",
    tradeType: "rent",
    price: 6000, // 주당 대여료
    images: ["mock-cover-1"],
    status: "available", // available, renting, completed
    description: "이영희 교수님 알고리즘 수업 교재입니다. 필기는 거의 연필로만 살짝 해두어서 공부하시기에 전혀 지장 없습니다. 직거래는 전정관 앞에서 희망합니다!",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString() // 2일 전
  },
  {
    id: "book-2",
    sellerId: "bizking@univ.ac.kr",
    title: "마케팅원론 (개정 7판)",
    author: "안광호, 하영원",
    deptName: "경영학과",
    courseName: "마케팅원론",
    profName: "홍길동 교수",
    tradeType: "sale",
    price: 18000,
    images: ["mock-cover-2"],
    status: "available",
    description: "경영학과 전공선택 마케팅원론 새책 급 서적입니다. 밑줄이나 낙서 전혀 없고, 스프링 분철 완료된 상태라 책장 넘기기 아주 편해요. 빠르게 처분합니다.",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString() // 1일 전
  },
  {
    id: "book-3",
    sellerId: "circuits@univ.ac.kr",
    title: "회로이론 (Microelectronic Circuits)",
    author: "Adel S. Sedra",
    deptName: "전자공학과",
    courseName: "회로이론",
    profName: "정우성 교수",
    tradeType: "rent",
    price: 5000,
    images: ["mock-cover-3"],
    status: "renting", // 현재 대여중
    description: "정우성 교수님 회로이론 수업에서 사용한 원서입니다. 필기 조금 있으나 보시는데 문제 없습니다. 대여 환영해요!",
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
  },
  {
    id: "book-4",
    sellerId: "comgong@univ.ac.kr",
    title: "C로 배우는 자료구조 및 실습",
    author: "이지훈",
    deptName: "컴퓨터공학과",
    courseName: "자료구조 및 실습",
    profName: "김철수 교수",
    tradeType: "sale",
    price: 13000,
    images: ["mock-cover-4"],
    status: "completed", // 거래 완료
    description: "자료구조 실습 교재입니다. 중간중간 실습 힌트나 필기가 적혀있어 독학할 때도 꽤 유용하게 쓰일 겁니다.",
    createdAt: new Date(Date.now() - 100 * 3600 * 1000).toISOString()
  },
  {
    id: "book-5",
    sellerId: "admin@univ.ac.kr",
    title: "재무관리론 (Fundamentals of Corporate Finance)",
    author: "Stephen A. Ross",
    deptName: "경영학과",
    courseName: "재무관리론",
    profName: "최다솜 교수",
    tradeType: "rent",
    price: 7000,
    images: ["mock-cover-5"],
    status: "available",
    description: "최다솜 교수님 수업 재무관리론입니다. 상태 깨끗하고 아주 좋습니다. 대여 원하시는 날짜 적어서 신청해 주세요.",
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  }
];

// 초기 대여 기록
const INITIAL_RENTALS = [
  {
    id: "rent-1",
    bookId: "book-3",
    buyerId: "comgong@univ.ac.kr",
    startDate: "2026-06-10",
    endDate: "2026-06-24",
    totalPrice: 10000
  }
];

// 초기 채팅방 및 메시지
const INITIAL_CHATS = [
  {
    id: "chat-1",
    bookId: "book-3",
    sellerId: "circuits@univ.ac.kr",
    buyerId: "comgong@univ.ac.kr",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
];

const INITIAL_MESSAGES = [
  {
    id: "msg-1",
    roomId: "chat-1",
    senderId: "comgong@univ.ac.kr",
    content: "안녕하세요! 회로이론 도서 대여 신청하고 싶어서 연락드렸습니다. 대여 기간은 6월 10일부터 6월 24일까지 14일 희망해요.",
    timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: "msg-2",
    roomId: "chat-1",
    senderId: "circuits@univ.ac.kr",
    content: "안녕하세요! 네, 해당 기간 대여 가능합니다. 6월 10일 전공학관 3층 매점 앞에서 거래 괜찮으신가요?",
    timestamp: new Date(Date.now() - 47.9 * 3600 * 1000).toISOString()
  },
  {
    id: "msg-3",
    roomId: "chat-1",
    senderId: "comgong@univ.ac.kr",
    content: "네 좋습니다! 그때 뵙고 대금 이체 및 수령하겠습니다.",
    timestamp: new Date(Date.now() - 47.8 * 3600 * 1000).toISOString()
  }
];

// ==========================================
// 2. LocalStorage 데이터베이스 초기화 및 매니저
// ==========================================

class LocalDB {
  static get(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static init() {
    if (!localStorage.getItem("bt_initialized")) {
      this.set("bt_users", INITIAL_USERS);
      this.set("bt_books", INITIAL_BOOKS);
      this.set("bt_rentals", INITIAL_RENTALS);
      this.set("bt_chats", INITIAL_CHATS);
      this.set("bt_messages", INITIAL_MESSAGES);
      localStorage.setItem("bt_initialized", "true");
    }
  }

  static reset() {
    localStorage.clear();
    this.init();
    window.location.reload();
  }
}

// 초기 기동 데이터베이스 셋업
LocalDB.init();

// ==========================================
// 3. 글로벌 상태 관리 (Global State)
// ==========================================

const state = {
  currentUser: LocalDB.get("bt_current_user", null),
  currentView: LocalDB.get("bt_current_user", null) ? "explore" : "landing",
  
  // 도서 목록 및 필터 상태
  books: LocalDB.get("bt_books", []),
  searchQuery: "",
  filterDept: "",
  filterCourse: "",
  filterProf: "",
  filterTradeType: "all", // all, sale, rent
  filterOnlyAvailable: false,

  // 상세 뷰 정보
  selectedBookId: null,
  activeDetailImageIdx: 0,

  // 채팅 뷰 정보
  selectedChatRoomId: null,
  chatAutoReplyTimer: null,

  // 도서 등록 정보
  uploadImages: [], // Base64 또는 Object URL 배열

  // 인증 임시 정보
  authMode: "login", // login, signup
  signupEmail: "",
  signupCode: "",
  generatedCode: "",
  codeTimer: null,
  codeTimerSeconds: 0,
  isEmailVerified: false
};

// ==========================================
// 4. 공통 UI 유틸리티 (Toast, Icons)
// ==========================================

function showToast(message, actionLabel = "", actionCallback = null) {
  const container = document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = "toast";
  
  toast.innerHTML = `
    <span>${message}</span>
    ${actionLabel ? `<button class="toast-action" id="toast-act-btn">${actionLabel}</button>` : ""}
  `;
  
  if (actionLabel && actionCallback) {
    toast.querySelector("#toast-act-btn").addEventListener("click", () => {
      actionCallback();
      toast.remove();
    });
  }
  
  container.appendChild(toast);
  
  // 5초 후 삭제
  setTimeout(() => {
    toast.style.animation = "slideDown 0.3s reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  container.className = "toast-container";
  document.body.appendChild(container);
  return container;
}

// SVG 아이콘 라이브러리
const ICONS = {
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`
};

// ==========================================
// 5. 라우팅 & 네비게이션 제어
// ==========================================

function navigateTo(view, params = {}) {
  // 정리
  if (state.codeTimer) {
    clearInterval(state.codeTimer);
    state.codeTimer = null;
  }
  if (state.chatAutoReplyTimer) {
    clearTimeout(state.chatAutoReplyTimer);
    state.chatAutoReplyTimer = null;
  }

  state.currentView = view;

  if (view === "detail") {
    state.selectedBookId = params.bookId;
    state.activeDetailImageIdx = 0;
  } else if (view === "chats") {
    state.selectedChatRoomId = params.roomId || null;
  } else if (view === "register") {
    state.uploadImages = [];
  }

  // 브라우저 최상단으로 스크롤 이동
  window.scrollTo(0, 0);
  renderApp();
}

// ==========================================
// 6. 비즈니스 로직 함수들 (회원가입, 로그인, 도서등록, 대여 등)
// ==========================================

// [FR-101] 인증 이메일 타이머 및 코드 생성
function sendVerificationEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(ac\.kr|edu)$/i;
  if (!emailRegex.test(email)) {
    showToast("대학 공식 이메일 주소(@*.ac.kr 또는 @*.edu)를 입력해 주세요.");
    return false;
  }

  const users = LocalDB.get("bt_users", []);
  if (users.find(u => u.univEmail.toLowerCase() === email.toLowerCase())) {
    showToast("이미 가입된 이메일입니다. 로그인해 주세요.");
    return false;
  }

  // 6자리 난수 코드 생성
  state.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  state.signupEmail = email;
  state.isEmailVerified = false;
  
  // 5분 카운트다운 시작
  state.codeTimerSeconds = 300;
  if (state.codeTimer) clearInterval(state.codeTimer);
  
  state.codeTimer = setInterval(() => {
    state.codeTimerSeconds--;
    if (state.codeTimerSeconds <= 0) {
      clearInterval(state.codeTimer);
      state.codeTimer = null;
      state.generatedCode = "";
      showToast("인증 시간이 초과되었습니다. 인증 코드를 재전송해 주세요.");
    }
    renderApp();
  }, 1000);

  // 테스트의 편의성을 위해 화면에 인증 코드를 복사 가능한 형태로 즉시 제공함
  showToast(`[테스트] 인증번호 발송: ${state.generatedCode}`, "코드 복사", () => {
    navigator.clipboard.writeText(state.generatedCode);
    showToast("인증 코드가 클립보드에 복사되었습니다.");
  });

  return true;
}

// 이메일 인증코드 검증
function verifyCode(code) {
  if (!state.generatedCode || state.codeTimerSeconds <= 0) {
    showToast("발급된 인증 코드가 없거나 시간이 초과되었습니다.");
    return false;
  }

  if (code.trim() === state.generatedCode) {
    clearInterval(state.codeTimer);
    state.codeTimer = null;
    state.isEmailVerified = true;
    showToast("이메일 인증에 성공했습니다! 비밀번호를 설정하세요.");
    renderApp();
    return true;
  } else {
    showToast("인증 코드가 일치하지 않습니다. 다시 확인해 주세요.");
    return false;
  }
}

// 회원가입 완료
function completeSignUp(nickname, password) {
  if (!state.isEmailVerified) {
    showToast("이메일 인증이 완료되지 않았습니다.");
    return;
  }
  if (!nickname || nickname.trim().length < 2) {
    showToast("닉네임을 2자 이상 입력해 주세요.");
    return;
  }
  if (!password || password.length < 4) {
    showToast("비밀번호는 4자 이상이어야 합니다.");
    return;
  }

  const users = LocalDB.get("bt_users", []);
  
  // 닉네임 중복 체크
  if (users.find(u => u.nickname === nickname.trim())) {
    showToast("이미 사용 중인 닉네임입니다.");
    return;
  }

  const newUser = {
    id: state.signupEmail,
    nickname: nickname.trim(),
    univEmail: state.signupEmail,
    passwordHash: password, // 모의 해싱
    isVerified: true
  };

  users.push(newUser);
  LocalDB.set("bt_users", users);
  
  // 가입 완료 후 즉시 로그인
  state.currentUser = newUser;
  LocalDB.set("bt_current_user", newUser);
  
  showToast(`${nickname}님, 회원가입이 완료되었습니다!`);
  navigateTo("explore");
}

// 로그인 처리
function login(email, password) {
  const users = LocalDB.get("bt_users", []);
  const user = users.find(u => u.univEmail.toLowerCase() === email.toLowerCase() && u.passwordHash === password);
  
  if (user) {
    state.currentUser = user;
    LocalDB.set("bt_current_user", user);
    showToast(`${user.nickname}님, 환영합니다!`);
    navigateTo("explore");
  } else {
    showToast("이메일 또는 비밀번호가 올바르지 않습니다.");
  }
}

// 로그아웃 처리
function logout() {
  state.currentUser = null;
  LocalDB.set("bt_current_user", null);
  showToast("로그아웃 되었습니다.");
  navigateTo("landing");
}

// 도서 등록 처리 [FR-201]
function registerBook(formData) {
  if (!state.currentUser) return;

  const books = LocalDB.get("bt_books", []);
  const newId = "book-" + (books.length + 100);

  // 이미지가 비어있을 경우, 예쁜 임시 CSS 스타일링용 표지 번호 할당
  const images = state.uploadImages.length > 0 ? state.uploadImages : ["mock-cover-default"];

  const newBook = {
    id: newId,
    sellerId: state.currentUser.id,
    title: formData.title.trim(),
    author: formData.author.trim(),
    deptName: formData.deptName,
    courseName: formData.courseName,
    profName: formData.profName,
    tradeType: formData.tradeType, // 'sale' | 'rent'
    price: parseInt(formData.price),
    images: images,
    status: "available",
    description: formData.description.trim(),
    createdAt: new Date().toISOString()
  };

  books.unshift(newBook); // 최신 목록을 위해 앞에 추가
  LocalDB.set("bt_books", books);
  state.books = books;

  showToast("도서가 정상적으로 등록되었습니다!");
  navigateTo("explore");
}

// 구매 신청 처리 [FR-302]
function requestPurchase(bookId) {
  if (!state.currentUser) {
    showToast("로그인이 필요한 서비스입니다.");
    navigateTo("landing");
    return;
  }

  const books = LocalDB.get("bt_books", []);
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  if (book.sellerId === state.currentUser.id) {
    showToast("자신이 등록한 책은 구매할 수 없습니다.");
    return;
  }

  const chats = LocalDB.get("bt_chats", []);
  
  // 이미 존재하는 채팅방이 있는지 확인
  let existingRoom = chats.find(c => c.bookId === bookId && c.buyerId === state.currentUser.id);
  
  if (existingRoom) {
    showToast("이미 진행 중인 거래 채팅이 존재합니다. 채팅방으로 이동합니다.");
    navigateTo("chats", { roomId: existingRoom.id });
    return;
  }

  // 신규 채팅방 개설
  const newRoomId = "chat-" + (chats.length + 100);
  const newRoom = {
    id: newRoomId,
    bookId: bookId,
    sellerId: book.sellerId,
    buyerId: state.currentUser.id,
    createdAt: new Date().toISOString()
  };

  chats.push(newRoom);
  LocalDB.set("bt_chats", chats);

  // 구매 신청 첫 시스템 자동 발송 메시지 등록
  const messages = LocalDB.get("bt_messages", []);
  const sellerInfo = LocalDB.get("bt_users", []).find(u => u.id === book.sellerId);
  
  const introMsg = {
    id: "msg-" + (messages.length + 100),
    roomId: newRoomId,
    senderId: state.currentUser.id,
    content: `안녕하세요! '${book.title}' 도서 구매 신청합니다. 오프라인 직거래 가능하신 시간과 장소 조율하고 싶습니다.`,
    timestamp: new Date().toISOString()
  };

  messages.push(introMsg);
  LocalDB.set("bt_messages", messages);

  // 1.5초 후 판매자 시뮬레이션 자동 답변
  simulateSellerReply(newRoomId, book.sellerId, `안녕하세요! 연락주셔서 감사합니다. 네, 거래 가능합니다. 보통 평일 낮에 학생회관 앞에서 거래 선호하는데 혹시 괜찮으신가요?`);

  showToast("거래 채팅방이 개설되었습니다!");
  navigateTo("chats", { roomId: newRoomId });
}

// 대여 신청 처리 [FR-303]
function requestRental(bookId, startDate, endDate, totalPrice) {
  if (!state.currentUser) {
    showToast("로그인이 필요한 서비스입니다.");
    navigateTo("landing");
    return;
  }

  const books = LocalDB.get("bt_books", []);
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  const chats = LocalDB.get("bt_chats", []);
  
  // 이미 대여 협의 중이거나 대여 신청한 채팅방 있는지 확인
  let existingRoom = chats.find(c => c.bookId === bookId && c.buyerId === state.currentUser.id);
  
  if (existingRoom) {
    showToast("이미 진행 중인 거래 채팅이 존재합니다. 채팅방으로 이동합니다.");
    navigateTo("chats", { roomId: existingRoom.id });
    return;
  }

  const newRoomId = "chat-" + (chats.length + 100);
  const newRoom = {
    id: newRoomId,
    bookId: bookId,
    sellerId: book.sellerId,
    buyerId: state.currentUser.id,
    createdAt: new Date().toISOString()
  };

  chats.push(newRoom);
  LocalDB.set("bt_chats", chats);

  // 대여 신청서 임시 세션 보관 (대여 확정 전까지 채팅 메타 정보로 유지하기 위해 로컬에 저장)
  const pendingRentals = LocalDB.get("bt_pending_rentals", {});
  pendingRentals[newRoomId] = {
    startDate,
    endDate,
    totalPrice
  };
  LocalDB.set("bt_pending_rentals", pendingRentals);

  // 대여 신청 첫 메시지 자동 발송
  const messages = LocalDB.get("bt_messages", []);
  const introMsg = {
    id: "msg-" + (messages.length + 100),
    roomId: newRoomId,
    senderId: state.currentUser.id,
    content: `안녕하세요! '${book.title}' 도서 대여 신청합니다.\n📅 대여 기간: ${startDate} ~ ${endDate}\n💰 총 예상 대여비: ₩${totalPrice.toLocaleString()}원\n직거래 일정 조율 가능할까요?`,
    timestamp: new Date().toISOString()
  };

  messages.push(introMsg);
  LocalDB.set("bt_messages", messages);

  // 1.5초 후 판매자 시뮬레이션 자동 답변
  simulateSellerReply(newRoomId, book.sellerId, `안녕하세요! 대여 신청 확인했습니다. 명시해주신 기간(${startDate} ~ ${endDate})에 대여 가능합니다! 보통 대여거래 시 경영관 1층 로비에서 수령 선호하는데 시간 어떠신가요?`);

  showToast("대여 협의 채팅방이 개설되었습니다!");
  navigateTo("chats", { roomId: newRoomId });
}

// 판매자 시뮬레이션 답변 매커니즘
function simulateSellerReply(roomId, sellerId, defaultText) {
  state.chatAutoReplyTimer = setTimeout(() => {
    // 사용자가 현재 해당 채팅방에 머물고 있는지 상관없이 메시지 푸시
    const messages = LocalDB.get("bt_messages", []);
    const seller = LocalDB.get("bt_users", []).find(u => u.id === sellerId);
    
    const replyMsg = {
      id: "msg-" + (messages.length + 100),
      roomId: roomId,
      senderId: sellerId,
      content: defaultText,
      timestamp: new Date().toISOString()
    };
    
    messages.push(replyMsg);
    LocalDB.set("bt_messages", messages);
    
    if (state.currentView === "chats" && state.selectedChatRoomId === roomId) {
      renderApp();
      // 채팅 최하단으로 스크롤
      const msgContainer = document.getElementById("chat-messages-scroll");
      if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
    } else {
      showToast(`[${seller.nickname}] 새 메시지: ${defaultText.substring(0, 18)}...`, "이동", () => {
        navigateTo("chats", { roomId: roomId });
      });
    }
  }, 1500);
}

// 사용자 채팅 전송
function sendUserMessage(roomId, content) {
  if (!content.trim()) return;

  const messages = LocalDB.get("bt_messages", []);
  const newMsg = {
    id: "msg-" + (messages.length + 100),
    roomId: roomId,
    senderId: state.currentUser.id,
    content: content.trim(),
    timestamp: new Date().toISOString()
  };

  messages.push(newMsg);
  LocalDB.set("bt_messages", messages);
  renderApp();

  // 스크롤 아래로
  const msgContainer = document.getElementById("chat-messages-scroll");
  if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;

  // 판매자 자동 응답 시뮬레이션
  const room = LocalDB.get("bt_chats", []).find(r => r.id === roomId);
  if (room) {
    const isSeller = room.sellerId === state.currentUser.id;
    const partnerId = isSeller ? room.buyerId : room.sellerId;
    
    // 시뮬레이터: 구매자가 대화 시 판매자가 맞장구 침
    if (!isSeller) {
      const answers = [
        "아, 넵 알겠습니다! 그럼 학생회관 식당 쪽에서 뵐게요.",
        "확인했습니다. 거래 때 도서 상태 한번 보시고 송금해 주셔도 됩니다~",
        "네, 말씀하신 시간도 괜찮아요. 그때 뵙겠습니다!",
        "좋습니다. 혹시 변동사항 생기시면 미리 편하게 말씀해 주세요."
      ];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      simulateSellerReply(roomId, partnerId, randomAnswer);
    }
  }
}

// 거래 상태 변경 및 동기화 [FR-301, FR-302, FR-303]
function updateBookStatus(bookId, status, roomId = null) {
  const books = LocalDB.get("bt_books", []);
  const bookIdx = books.findIndex(b => b.id === bookId);
  
  if (bookIdx === -1) return;
  books[bookIdx].status = status;
  LocalDB.set("bt_books", books);
  state.books = books;

  // 대여인 경우 실질적인 대여 대장 기록 추가
  if (status === "renting" && roomId) {
    const pendingRentals = LocalDB.get("bt_pending_rentals", {});
    const pendingInfo = pendingRentals[roomId];
    if (pendingInfo) {
      const rentals = LocalDB.get("bt_rentals", []);
      const newRental = {
        id: "rent-" + (rentals.length + 100),
        bookId: bookId,
        buyerId: state.currentUser.id, // 현재 로그인 유저
        startDate: pendingInfo.startDate,
        endDate: pendingInfo.endDate,
        totalPrice: pendingInfo.totalPrice
      };
      
      // 대여 중복 생성 방지
      if (!rentals.find(r => r.bookId === bookId && r.startDate === pendingInfo.startDate)) {
        rentals.push(newRental);
        LocalDB.set("bt_rentals", rentals);
      }
    }
  }

  showToast(`도서 거래 상태가 '${status === 'completed' ? '거래완료' : status === 'renting' ? '대여중' : '판매중'}'로 업데이트되었습니다.`);
  renderApp();
}

// ==========================================
// 7. 화면별 렌더링 뷰 빌더 (Render Views)
// ==========================================

// 7-1. Landing / Login & Signup View [FR-101]
function renderLandingView() {
  const isLogin = state.authMode === "login";
  
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo" style="justify-content: center; font-size: 28px; margin-bottom: 8px;">
            ${ICONS.book} 북스토크 <span class="logo-tag">UNIV</span>
          </div>
          <p class="auth-subtitle">같은 대학 학생 간의 전공서적 대여 & 중고거래</p>
        </div>
        
        ${isLogin ? renderLoginForm() : renderSignupForm()}
        
      </div>
    </div>
  `;
}

function renderLoginForm() {
  return `
    <form id="login-form" onsubmit="event.preventDefault();">
      <div class="form-group">
        <label class="form-label">학교 공식 이메일</label>
        <input type="email" id="login-email" class="form-input" placeholder="student@univ.ac.kr" required>
      </div>
      <div class="form-group">
        <label class="form-label">비밀번호</label>
        <input type="password" id="login-password" class="form-input" placeholder="비밀번호 입력" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;" id="btn-login-submit">로그인</button>
      
      <!-- 테스트용 퀵 액세스 단추 -->
      <div style="margin-top: 16px; text-align: center;">
        <span style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 8px;">빠른 체험을 위해 준비된 테스트 계정</span>
        <button type="button" class="btn btn-secondary" style="width: 100%; padding: 8px; font-size: 12px;" id="btn-quick-login">
          테스트 계정으로 1초 로그인 (컴공학부고수)
        </button>
      </div>

      <div class="auth-toggle">
        아직 회원이 아니신가요? 
        <button type="button" class="auth-toggle-btn" id="btn-switch-signup">회원가입</button>
      </div>
    </form>
  `;
}

function renderSignupForm() {
  const isTimerActive = state.codeTimerSeconds > 0;
  const timeFormatted = `${Math.floor(state.codeTimerSeconds / 60)}:${(state.codeTimerSeconds % 60).toString().padStart(2, '0')}`;

  return `
    <form id="signup-form" onsubmit="event.preventDefault();">
      <div class="form-group">
        <label class="form-label">학교 공식 이메일 인증</label>
        <div class="input-with-button">
          <input type="email" id="signup-email-input" class="form-input" placeholder="yourname@univ.ac.kr" 
            value="${state.signupEmail}" ${state.isEmailVerified ? "disabled" : ""}>
          <button type="button" class="btn btn-secondary" style="padding: 12px 14px;" 
            id="btn-send-code" ${state.isEmailVerified ? "disabled" : ""}>
            ${isTimerActive ? "재전송" : "인증 발송"}
          </button>
        </div>
        
        ${isTimerActive && !state.isEmailVerified ? `
          <div class="timer-container">
            <span class="timer-msg">남은 인증 시간</span>
            <span class="timer-text">${timeFormatted}</span>
          </div>
        ` : ""}
      </div>
      
      <!-- 인증 코드 입력창 -->
      ${isTimerActive && !state.isEmailVerified ? `
        <div class="form-group" style="margin-top: 10px;">
          <label class="form-label">6자리 인증 코드</label>
          <div class="input-with-button">
            <input type="text" id="signup-code-input" class="form-input" placeholder="코드 입력" maxlength="6">
            <button type="button" class="btn btn-primary" id="btn-verify-code">인증 확인</button>
          </div>
        </div>
      ` : ""}

      <!-- 가입 정보 창 (이메일 인증이 완료되었을 때 활성화) -->
      <div style="opacity: ${state.isEmailVerified ? "1" : "0.5"}; pointer-events: ${state.isEmailVerified ? "auto" : "none"}; border-top: 1px dashed var(--border-color); padding-top: 16px; margin-top: 16px;">
        <div class="form-group">
          <label class="form-label">닉네임 설정</label>
          <input type="text" id="signup-nickname" class="form-input" placeholder="2자 이상 닉네임" ${!state.isEmailVerified ? "disabled" : ""}>
        </div>
        <div class="form-group">
          <label class="form-label">비밀번호 설정</label>
          <input type="password" id="signup-password" class="form-input" placeholder="4자 이상 비밀번호" ${!state.isEmailVerified ? "disabled" : ""}>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;" id="btn-signup-submit" ${!state.isEmailVerified ? "disabled" : ""}>
          가입 완료 및 로그인
        </button>
      </div>

      <div class="auth-toggle">
        이미 회원이신가요? 
        <button type="button" class="auth-toggle-btn" id="btn-switch-login">로그인</button>
      </div>
    </form>
  `;
}

// 7-2. Book Catalog Dashboard / Explore View [FR-301]
function renderExploreView() {
  // 학과별 개설 과목/교수 드롭다운 목록 구성
  const coursesList = state.filterDept ? ACADEMIC_DATA[state.filterDept] : [];

  // 도서 필터링 처리
  const filteredBooks = state.books.filter(book => {
    // 키워드 통합 검색
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchCourse = book.courseName.toLowerCase().includes(q);
      const matchProf = book.profName.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchCourse && !matchProf) return false;
    }

    // 학과/과목/교수 필터
    if (state.filterDept && book.deptName !== state.filterDept) return false;
    if (state.filterCourse && book.courseName !== state.filterCourse) return false;
    if (state.filterProf && book.profName !== state.filterProf) return false;

    // 거래 형태
    if (state.filterTradeType !== "all" && book.tradeType !== state.filterTradeType) return false;

    // 거래 가능 상품만 보기
    if (state.filterOnlyAvailable && book.status !== "available") return false;

    return true;
  });

  return `
    <div class="hero-banner">
      <div class="hero-decorations"></div>
      <div class="hero-title">대학 전공서적 대여 & 중고장터</div>
      <div class="hero-subtitle">매번 새 책 사기 부담스러우셨죠? 같은 학교 학생들과 검증된 이메일 계정으로 부담 없는 가격에 대여 및 직거래를 시작하세요!</div>
    </div>
    
    <div class="explorer-layout">
      <!-- 사이드바 필터 섹션 -->
      <aside class="filter-sidebar">
        <div class="filter-section">
          <h3 class="filter-title">📚 학과 / 과목 맞춤 필터</h3>
          
          <label class="form-label">학과 선택</label>
          <select id="filter-dept" class="select-filter">
            <option value="">전체 학과</option>
            ${Object.keys(ACADEMIC_DATA).map(dept => `
              <option value="${dept}" ${state.filterDept === dept ? "selected" : ""}>${dept}</option>
            `).join("")}
          </select>

          <label class="form-label">개설 과목</label>
          <select id="filter-course" class="select-filter" ${!state.filterDept ? "disabled" : ""}>
            <option value="">전체 과목</option>
            ${coursesList.map(item => `
              <option value="${item.course}" ${state.filterCourse === item.course ? "selected" : ""}>${item.course}</option>
            `).join("")}
          </select>

          <label class="form-label">교수명</label>
          <select id="filter-prof" class="select-filter" ${!state.filterDept ? "disabled" : ""}>
            <option value="">전체 교수</option>
            ${coursesList.map(item => `
              <option value="${item.professor}" ${state.filterProf === item.professor ? "selected" : ""}>${item.professor}</option>
            `).join("")}
          </select>
        </div>

        <div class="filter-section">
          <h3 class="filter-title">⚙️ 거래 방식 및 조건</h3>
          <div class="toggle-pills">
            <label class="pill-option">
              <input type="radio" name="tradeType" value="all" ${state.filterTradeType === "all" ? "checked" : ""}>
              전체 보기
            </label>
            <label class="pill-option">
              <input type="radio" name="tradeType" value="sale" ${state.filterTradeType === "sale" ? "checked" : ""}>
              구매/판매만 보기
            </label>
            <label class="pill-option">
              <input type="radio" name="tradeType" value="rent" ${state.filterTradeType === "rent" ? "checked" : ""}>
              대여만 보기
            </label>
          </div>
        </div>

        <div class="filter-section">
          <div class="toggle-pills">
            <label class="pill-option">
              <input type="checkbox" id="filter-available" ${state.filterOnlyAvailable ? "checked" : ""}>
              거래 가능 상품만 보기
            </label>
          </div>
        </div>

        <button class="btn btn-secondary" style="width: 100%; margin-top: 10px;" id="btn-clear-filters">필터 초기화</button>
      </aside>

      <!-- 우측 책 리스트 탐색 섹션 -->
      <main class="catalog-area">
        <div class="search-bar-container">
          <input type="text" id="search-input" class="search-input" placeholder="도서명, 저자명, 과목명, 교수명을 검색하세요..." value="${state.searchQuery}">
          <button class="search-btn" id="btn-search">
            ${ICONS.search} 검색
          </button>
        </div>

        <div class="catalog-header">
          <div class="catalog-count">검색 결과 <strong>${filteredBooks.length}</strong>건</div>
        </div>

        <div class="books-grid">
          ${filteredBooks.length > 0 ? filteredBooks.map(book => renderBookCard(book)).join("") : `
            <div class="empty-state">
              ${ICONS.book}
              <h3>조건에 일치하는 전공서적이 없습니다.</h3>
              <p>필터 값을 비우거나 검색어를 다르게 입력해 보세요.</p>
            </div>
          `}
        </div>
      </main>
    </div>
  `;
}

// 개별 책 카드 렌더러
function renderBookCard(book) {
  const isRent = book.tradeType === "rent";
  
  // 상태 뱃지
  let statusBadge = "";
  if (book.status === "available") {
    statusBadge = `<span class="status-badge status-available">거래가능</span>`;
  } else if (book.status === "renting") {
    statusBadge = `<span class="status-badge status-renting">대여중</span>`;
  } else {
    statusBadge = `<span class="status-badge status-completed">거래완료</span>`;
  }

  // 거래방식 뱃지
  const tradeBadge = isRent 
    ? `<span class="badge badge-rent">대여</span>` 
    : `<span class="badge badge-sale">판매</span>`;

  // 도서 표지 컴포넌트 (CSS 스타일링)
  const coverPreset = COVER_PRESETS[Math.abs(book.id.hashCode()) % COVER_PRESETS.length];
  
  let coverHTML = "";
  if (book.images[0].startsWith("mock-cover-")) {
    coverHTML = `
      <div style="width: 100%; height: 100%; background: ${coverPreset.bg}; display: flex; flex-direction: column; justify-content: space-between; padding: 20px; color: ${coverPreset.text}; font-size: 11px;">
        <div style="font-weight: 700; font-family: Outfit; font-size: 14px; line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${book.title}</div>
        <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px; font-weight: 600; opacity: 0.9;">${book.deptName}</div>
      </div>
    `;
  } else {
    coverHTML = `<img src="${book.images[0]}" class="book-card-image" alt="${book.title}">`;
  }

  return `
    <div class="card card-hover book-card" data-book-id="${book.id}">
      <div class="book-card-image-wrapper">
        ${coverHTML}
        <div class="book-card-badges">
          ${tradeBadge}
          ${statusBadge}
        </div>
      </div>
      <div class="book-card-content">
        <div class="book-card-meta">${book.deptName} • ${book.courseName}</div>
        <h4 class="book-card-title">${book.title}</h4>
        <p class="book-card-author">${book.author}</p>
        <div class="book-card-footer">
          <span class="book-card-price">
            ₩${book.price.toLocaleString()}
            <span class="book-card-price-unit">${isRent ? "/ 주" : ""}</span>
          </span>
        </div>
      </div>
    </div>
  `;
}

// 7-3. Book Detail View [FR-302, FR-303]
function renderDetailView() {
  const book = state.books.find(b => b.id === state.selectedBookId);
  if (!book) return "<p>도서를 찾을 수 없습니다.</p>";

  const isRent = book.tradeType === "rent";
  const users = LocalDB.get("bt_users", []);
  const seller = users.find(u => u.id === book.sellerId) || { nickname: "익명학생" };
  const isMyBook = state.currentUser && book.sellerId === state.currentUser.id;

  // 커버 스타일 프리셋 계산
  const coverPreset = COVER_PRESETS[Math.abs(book.id.hashCode()) % COVER_PRESETS.length];

  // 이미지 슬라이드 렌더러
  let previewHTML = "";
  if (book.images[state.activeDetailImageIdx].startsWith("mock-cover-")) {
    previewHTML = `
      <div style="width: 100%; height: 100%; background: ${coverPreset.bg}; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; color: ${coverPreset.text}; text-align: center;">
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 20px; line-height: 1.3;">${book.title}</h2>
        <div style="font-size: 14px; opacity: 0.9;">${book.author} 저</div>
        <div style="margin-top: 30px; border: 1.5px solid ${coverPreset.text}; padding: 6px 16px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 700;">${book.deptName} 전공</div>
      </div>
    `;
  } else {
    previewHTML = `<img src="${book.images[state.activeDetailImageIdx]}" class="main-preview-img" alt="도서 상태 사진">`;
  }

  // 액션 버튼 제어
  let actionButtonHTML = "";
  if (isMyBook) {
    actionButtonHTML = `
      <button class="btn btn-secondary" style="flex: 1;" disabled>내가 등록한 도서입니다</button>
    `;
  } else if (book.status !== "available") {
    actionButtonHTML = `
      <button class="btn btn-secondary" style="flex: 1;" disabled>거래가 불가능한 도서입니다 (${book.status === "renting" ? "대여중" : "거래완료"})</button>
    `;
  } else if (isRent) {
    actionButtonHTML = `
      <button class="btn btn-primary" id="btn-request-rent-modal">
        ${ICONS.calendar} 대여 일정 선택 및 신청
      </button>
    `;
  } else {
    actionButtonHTML = `
      <button class="btn btn-primary" id="btn-request-purchase">
        ${ICONS.chat} 즉시 구매 신청 (1:1 채팅)
      </button>
    `;
  }

  return `
    <div style="margin-bottom: 16px;">
      <button class="btn btn-secondary" id="btn-back-to-explore" style="padding: 8px 16px; font-size: 13px;">
        ${ICONS.arrowLeft} 도서 탐색으로 돌아가기
      </button>
    </div>

    <div class="detail-layout">
      <!-- 좌측 이미지 영역 -->
      <section class="detail-gallery">
        <div class="main-preview-container">
          ${previewHTML}
          
          ${book.images.length > 1 ? `
            <button class="carousel-btn carousel-btn-prev" id="btn-prev-img">&lt;</button>
            <button class="carousel-btn carousel-btn-next" id="btn-next-img">&gt;</button>
          ` : ""}
        </div>
        
        <div class="thumbnail-strip">
          ${book.images.map((img, idx) => `
            <div class="thumb-item ${idx === state.activeDetailImageIdx ? "active" : ""}" data-thumb-idx="${idx}">
              ${img.startsWith("mock-cover-") ? `
                <div style="width: 100%; height: 100%; background: ${coverPreset.bg}; display: flex; align-items: center; justify-content: center; color: white; font-size: 8px; font-weight: 700; text-align: center; padding: 2px;">
                  Cover
                </div>
              ` : `<img src="${img}" alt="도서 미리보기">`}
            </div>
          `).join("")}
        </div>
      </section>

      <!-- 우측 정보 설명 영역 -->
      <section class="detail-info">
        <div class="detail-meta-tags">
          <span class="tag-chip">${book.deptName}</span>
          <span class="tag-chip tag-chip-class">${book.courseName} • ${book.profName}</span>
          <span class="badge ${isRent ? "badge-rent" : "badge-sale"}">${isRent ? "대여" : "판매"}</span>
        </div>

        <h1 class="detail-title">${book.title}</h1>
        <p class="detail-author">${book.author}</p>

        <div class="detail-price-box">
          <span class="price-label">${isRent ? "일주일(7일) 기준 대여비" : "중고 판매가"}</span>
          <span class="price-amount">
            ₩${book.price.toLocaleString()}
            <span style="font-size: 14px; font-weight: 500; color: var(--text-muted);">${isRent ? " / 주" : ""}</span>
          </span>
        </div>

        <div class="detail-section">
          <h3 class="detail-section-title">판매자 정보</h3>
          <div class="seller-profile-card">
            <div class="seller-info-left">
              <div class="user-avatar">${seller.nickname[0]}</div>
              <div>
                <div style="font-weight: 700; font-size: 14px;">${seller.nickname}</div>
                <div style="font-size: 11px; color: var(--text-muted);">학생 이메일 인증 완료됨</div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section" style="flex: 1;">
          <h3 class="detail-section-title">도서 상태 설명 및 전달 장소</h3>
          <p class="detail-description">${book.description || "등록된 상세 설명이 없습니다."}</p>
        </div>

        <div class="detail-actions">
          ${actionButtonHTML}
        </div>
      </section>
    </div>
  `;
}

// 7-4. 대여 기간 설정 캘린더 모달 [FR-303]
function renderRentalModal(book) {
  return `
    <div class="modal-overlay" id="rental-modal">
      <div class="modal-wrapper">
        <div class="modal-header">
          <h3 class="modal-title">📅 대여 기간 설정</h3>
          <button class="modal-close" id="btn-close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            도서를 대여할 시작일과 반납할 종료일을 선택하면 대여비가 실시간 자동 산정됩니다.
          </p>
          
          <div class="date-selector-row">
            <div>
              <label class="form-label">대여 시작일</label>
              <input type="date" id="rent-start-date" class="date-input-field">
            </div>
            <div>
              <label class="form-label">대여 반납일</label>
              <input type="date" id="rent-end-date" class="date-input-field">
            </div>
          </div>

          <!-- 실시간 대여 요금 노출 박스 -->
          <div class="calc-box">
            <div class="calc-formula">
              예상 금액 = (총 대여일수 / 7) * 일주일 대여비
            </div>
            <div class="calc-row">
              <span>일주일 기준 대여비</span>
              <span style="font-weight: 600;">₩${book.price.toLocaleString()}원</span>
            </div>
            <div class="calc-row">
              <span>선택된 대여 일수</span>
              <span id="calc-days" style="font-weight: 600; color: var(--primary);">0일</span>
            </div>
            <div class="calc-row total-row">
              <span>총 예상 대여료</span>
              <span id="calc-price" style="font-size: 18px; color: var(--rent);">₩0원</span>
            </div>
          </div>
          
          <p style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">
            * 대여비는 일할 계산되어 계산되며, 소수점 이하 금액이 발생할 경우 100원 단위로 반올림 처리됩니다.
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" style="padding: 10px 16px;" id="btn-cancel-rental">취소</button>
          <button class="btn btn-primary" style="padding: 10px 16px;" id="btn-confirm-rental" disabled>대여 신청 확정</button>
        </div>
      </div>
    </div>
  `;
}

// 7-5. 1:1 채팅방 및 거래 상태 동기화 [FR-301, 302, 303]
function renderChatsView() {
  if (!state.currentUser) return "<p>로그인이 필요한 화면입니다.</p>";

  const chats = LocalDB.get("bt_chats", []);
  const messages = LocalDB.get("bt_messages", []);
  const books = LocalDB.get("bt_books", []);
  const users = LocalDB.get("bt_users", []);

  // 내가 속해 있는 채팅방 필터링
  const myChats = chats.filter(c => c.sellerId === state.currentUser.id || c.buyerId === state.currentUser.id);
  
  // 선택한 특정 채팅방 정보 로딩
  const activeRoom = myChats.find(c => c.id === state.selectedChatRoomId);
  
  // 모바일 화면용 반응형 클래스 체크
  const chatLayoutClass = activeRoom ? "chat-layout room-active" : "chat-layout";

  return `
    <div class="${chatLayoutClass}">
      
      <!-- 좌측 채팅 리스트 패널 -->
      <aside class="chat-list-panel">
        <div class="chat-list-header">1:1 직거래 채팅방</div>
        <div class="chat-rooms-container">
          ${myChats.length > 0 ? myChats.map(room => {
            const isSeller = room.sellerId === state.currentUser.id;
            const partnerId = isSeller ? room.buyerId : room.sellerId;
            const partner = users.find(u => u.id === partnerId) || { nickname: "탈퇴한 사용자" };
            const book = books.find(b => b.id === room.bookId) || { title: "삭제된 도서", status: "completed", images: ["mock-cover-default"] };
            
            // 해당 방의 마지막 메시지 로딩
            const roomMsgs = messages.filter(m => m.roomId === room.id);
            const lastMsg = roomMsgs.length > 0 ? roomMsgs[roomMsgs.length - 1].content : "최근 메시지가 없습니다.";
            const lastTime = roomMsgs.length > 0 ? formatRelativeTime(roomMsgs[roomMsgs.length - 1].timestamp) : "";

            // 상태 배지
            let statusBadgeHTML = "";
            if (book.status === "available") {
              statusBadgeHTML = `<span class="badge badge-sale" style="font-size:9px; padding: 2px 4px;">판매/대여중</span>`;
            } else if (book.status === "renting") {
              statusBadgeHTML = `<span class="badge badge-rent" style="font-size:9px; padding: 2px 4px;">대여중</span>`;
            } else {
              statusBadgeHTML = `<span class="badge badge-completed" style="font-size:9px; padding: 2px 4px;">거래완료</span>`;
            }

            // 책 표지 
            const coverPreset = COVER_PRESETS[Math.abs(book.id.hashCode()) % COVER_PRESETS.length];
            const isMockImg = book.images && book.images[0].startsWith("mock-cover-");
            
            const thumbImgHTML = isMockImg 
              ? `<div style="width:44px; height:44px; background:${coverPreset.bg}; border-radius:var(--radius-sm); flex-shrink:0;"></div>`
              : `<img src="${book.images[0]}" class="chat-room-img" alt="책 썸네일">`;

            return `
              <div class="chat-room-item ${state.selectedChatRoomId === room.id ? "active" : ""}" data-room-id="${room.id}">
                ${thumbImgHTML}
                <div class="chat-room-info">
                  <div class="chat-room-meta">
                    <span class="chat-room-partner">${partner.nickname}</span>
                    <span class="chat-room-time">${lastTime}</span>
                  </div>
                  <div class="chat-room-book">${book.title}</div>
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
                    <span class="chat-room-last-msg">${lastMsg}</span>
                    ${statusBadgeHTML}
                  </div>
                </div>
              </div>
            `;
          }).join("") : `
            <div style="text-align: center; color: var(--text-muted); padding: 40px 10px; font-size: 13px;">
              진행 중인 대여 및 중고 거래 채팅이 없습니다.
            </div>
          `}
        </div>
      </aside>

      <!-- 우측 채팅 메세지 콘솔 패널 -->
      <main class="chat-room-panel">
        ${activeRoom ? renderChatRoomConsole(activeRoom, messages, books, users) : `
          <div class="chat-no-active">
            ${ICONS.chat}
            <p>목록에서 채팅방을 선택하여 거래를 조율하세요.</p>
          </div>
        `}
      </main>

    </div>
  `;
}

// 1:1 대화 콘솔 서브 렌더러
function renderChatRoomConsole(room, messages, books, users) {
  const isSeller = room.sellerId === state.currentUser.id;
  const partnerId = isSeller ? room.buyerId : room.sellerId;
  const partner = users.find(u => u.id === partnerId) || { nickname: "익명학생" };
  const book = books.find(b => b.id === room.bookId);
  const roomMsgs = messages.filter(m => m.roomId === room.id);

  // 대여 메타 정보 조회 (캘린더로 대여 신청한 내역 정보가 있다면)
  const pendingRentals = LocalDB.get("bt_pending_rentals", {});
  const pendingRental = pendingRentals[room.id];

  // 도서 상태 동기화 뱃지
  let statusBadgeHTML = "";
  if (book.status === "available") {
    statusBadgeHTML = `<span class="badge badge-sale">거래가능</span>`;
  } else if (book.status === "renting") {
    statusBadgeHTML = `<span class="badge badge-rent">대여중</span>`;
  } else {
    statusBadgeHTML = `<span class="badge badge-completed">거래완료</span>`;
  }

  // 판매자 권한의 액션 버튼 (상태 제어) [FR-302, FR-303]
  let sellerActionBtnHTML = "";
  if (isSeller) {
    if (book.status === "available") {
      if (book.tradeType === "rent") {
        sellerActionBtnHTML = `
          <button class="btn btn-primary" id="btn-seller-confirm-rent" style="padding: 8px 12px; font-size:12px;">
            ${ICONS.check} 완료
          </button>
        `;
      } else {
        sellerActionBtnHTML = `
          <button class="btn btn-primary" id="btn-seller-confirm-sale" style="padding: 8px 12px; font-size:12px;">
            ${ICONS.check} 완료
          </button>
        `;
      }
    } else {
      sellerActionBtnHTML = `
        <span style="font-size:11px; color:var(--text-muted); font-weight:700;">완료됨</span>
      `;
    }
  }

  // 대여 확정된 경우 상단 고정 대여 기록 판넬 정보 핀 [FR-303]
  let pinHeaderRentalHTML = "";
  if (book.status === "renting") {
    // 실질적인 대여 대장에서 정보 파싱 (없으면 대여 신청 대기에서 정보 로드)
    const rentals = LocalDB.get("bt_rentals", []);
    const rentalRecord = rentals.find(r => r.bookId === book.id) || pendingRental;
    
    if (rentalRecord) {
      pinHeaderRentalHTML = `
        <div class="rental-pinned-info">
          <div class="rental-pinned-dates">
            📅 대여 고정일정: ${rentalRecord.startDate} ~ ${rentalRecord.endDate}
          </div>
          <div>
            💰 대여료: ₩${rentalRecord.totalPrice.toLocaleString()}원
          </div>
        </div>
      `;
    }
  }

  return `
    <div class="chat-header">
      <div class="chat-header-top">
        <div style="display:flex; align-items:center;">
          <button class="btn-back-chat" id="btn-back-to-chat-list">
            ${ICONS.arrowLeft}
          </button>
          <div class="chat-header-title">
            ${partner.nickname}
            <span style="font-size: 11px; color: var(--text-muted); font-weight: normal;">(@univ.ac.kr 인증)</span>
          </div>
        </div>
        <div>
          ${sellerActionBtnHTML}
        </div>
      </div>
      
      <div class="chat-header-book-info">
        ${statusBadgeHTML}
        <span class="chat-header-book-title" id="chat-linked-book" data-book-id="${book.id}">
          ${book.title}
        </span>
        <span>•</span>
        <span>₩${book.price.toLocaleString()}${book.tradeType === 'rent' ? '/주' : ''}</span>
      </div>

      <!-- 대여 기간 상단 핀 바 -->
      ${pinHeaderRentalHTML}
    </div>

    <!-- 대화 말풍선 영역 -->
    <div class="chat-messages" id="chat-messages-scroll">
      ${roomMsgs.map(msg => {
        const isOutgoing = msg.senderId === state.currentUser.id;
        const msgTimeStr = formatClockTime(msg.timestamp);
        
        return `
          <div class="msg-bubble-wrapper ${isOutgoing ? "outgoing" : "incoming"}">
            <span class="msg-sender">${isOutgoing ? state.currentUser.nickname : partner.nickname}</span>
            <div class="msg-bubble">${msg.content.replace(/\n/g, '<br>')}</div>
            <span class="msg-time">${msgTimeStr}</span>
          </div>
        `;
      }).join("")}
    </div>

    <!-- 입력바 -->
    <div class="chat-input-area">
      <textarea id="chat-textarea-input" class="chat-textarea" placeholder="메시지를 입력하세요... (엔터 전송)"></textarea>
      <button class="btn-send-msg" id="btn-send-message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px; height:20px;">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  `;
}

// 7-6. 도서 등록 / 판매자 폼 뷰 [FR-201]
function renderRegisterView() {
  const depts = Object.keys(ACADEMIC_DATA);
  const selectedDept = document.getElementById("reg-dept")?.value || "";
  const courses = selectedDept ? ACADEMIC_DATA[selectedDept] : [];

  return `
    <div class="form-card">
      <h2 style="font-size:24px; font-weight:800; margin-bottom:8px; letter-spacing:-0.5px;">📚 전공서적 대여 / 판매 등록</h2>
      <p style="color:var(--text-muted); font-size:13px; margin-bottom:24px;">교재명, 학과 및 수업 교수명을 기입하여 교재가 필요한 학생들을 쉽게 만나보세요.</p>
      
      <form id="book-register-form" onsubmit="event.preventDefault();">
        <div class="form-group">
          <label class="form-label">도서명 (필수)</label>
          <input type="text" id="reg-title" class="form-input" placeholder="전공교재 풀네임을 입력하세요" required>
        </div>

        <div class="form-group">
          <label class="form-label">저자명 (필수)</label>
          <input type="text" id="reg-author" class="form-input" placeholder="저자명을 입력하세요" required>
        </div>

        <!-- 학과 분류 드롭다운 메뉴 (FR-201 동적 필터링) -->
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">학과 분류 (필수)</label>
            <select id="reg-dept" class="select-filter" style="background-color:white;" required>
              <option value="">학과를 선택하세요</option>
              ${depts.map(d => `<option value="${d}">${d}</option>`).join("")}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">해당 수업 과목 / 교수 (필수)</label>
            <select id="reg-course-prof" class="select-filter" style="background-color:white;" disabled required>
              <option value="">학과를 먼저 선택하세요</option>
            </select>
          </div>
        </div>

        <!-- 거래 방식 라디오 버튼 -->
        <div class="form-group">
          <label class="form-label">거래 유형 선택 (필수)</label>
          <div class="radio-tabs">
            <label class="radio-tab-label" id="label-trade-sale">
              <input type="radio" name="reg-trade-type" value="sale" checked> 💰 중고 중개 판매
            </label>
            <label class="radio-tab-label" id="label-trade-rent">
              <input type="radio" name="reg-trade-type" value="rent"> 📅 기간 약정 대여
            </label>
          </div>
        </div>

        <!-- 유동성 가격 인풋창 -->
        <div class="form-group">
          <label class="form-label" id="price-input-label">판매 금액 (필수)</label>
          <div class="input-wrapper">
            <span style="position:absolute; left:16px; font-weight:700; color:var(--text-main);">₩</span>
            <input type="number" id="reg-price" class="form-input" style="padding-left:32px;" placeholder="금액 입력" required min="100" step="100">
            <span style="position:absolute; right:16px; font-size:12px; color:var(--text-muted);" id="price-unit-label">원</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">도서 세부 정보 및 거래 희망 장소 (선택)</label>
          <textarea id="reg-desc" class="form-input" style="height:120px; resize:none;" placeholder="도서 보존 상태(밑줄, 낙서 유무, 찢어짐 등) 및 거래 시간, 장소를 공유하면 빠른 매칭에 유리합니다."></textarea>
        </div>

        <!-- 이미지 업로드 섹션 (최대 5장 미리보기 및 개별 삭제) -->
        <div class="form-group">
          <label class="form-label">책 실물 사진 첨부 (최대 5장)</label>
          
          <input type="file" id="reg-file-input" style="display:none;" accept="image/*" multiple>
          <div class="upload-dropzone" id="btn-upload-trigger">
            ${ICONS.camera}
            <div class="upload-text">전공책의 내외부, 낙서 등을 찍어 올려보세요 (클릭하여 추가)</div>
            <div class="upload-text" style="margin-top:4px;"><strong id="upload-counter">0 / 5 장 첨부됨</strong></div>
          </div>

          <!-- 첨부 이미지 미리보기 목록 -->
          <div class="upload-previews-container" id="upload-previews-list">
            <!-- 동적 썸네일 노출 영역 -->
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; font-size:16px;" id="btn-register-submit" disabled>
          장터에 도서 게시 등록하기
        </button>
      </form>
    </div>
  `;
}

// 7-7. 마이페이지 / 거래 내역 및 프로필 뷰 (추가 UX 완성도 향상)
function renderProfileView() {
  if (!state.currentUser) return "<p>로그인이 필요한 화면입니다.</p>";

  const books = LocalDB.get("bt_books", []);
  const rentals = LocalDB.get("bt_rentals", []);

  // 내가 판매자로 올린 책 목록
  const mySellings = books.filter(b => b.sellerId === state.currentUser.id);
  // 내가 대여인 혹은 구매자로 거래한 이력
  const myPurchases = rentals.filter(r => r.buyerId === state.currentUser.id);

  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <!-- 프로필 상단 헤더 -->
      <div style="background-color: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 32px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div class="user-avatar" style="width: 64px; height: 64px; font-size: 24px;">${state.currentUser.nickname[0]}</div>
          <div>
            <h2 style="font-size: 20px; font-weight: 800;">${state.currentUser.nickname}</h2>
            <p style="font-size: 13px; color: var(--text-muted);">${state.currentUser.univEmail} (@univ.ac.kr 대학생 인증완료)</p>
          </div>
        </div>
        <button class="btn btn-secondary" id="btn-profile-logout" style="padding: 8px 16px; font-size:13px; color:#ef4444; border-color:#fee2e2;">
          로그아웃
        </button>
      </div>

      <!-- 대여 및 중고장터 나의 거래 관리 탭 -->
      <div style="background-color: white; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-sm);">
        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 16px; border-bottom: 2px solid var(--bg-light); padding-bottom: 8px;">내 전공서적 판매/대여 등록 현황</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          ${mySellings.length > 0 ? mySellings.map(book => {
            const isRent = book.tradeType === "rent";
            let statusText = book.status === "available" ? "거래가능" : book.status === "renting" ? "대여중" : "거래완료";
            let statusClass = book.status === "available" ? "status-available" : book.status === "renting" ? "status-renting" : "status-completed";
            
            return `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: var(--bg-light);">
                <div>
                  <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${book.title}</div>
                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                    ${book.deptName} • ₩${book.price.toLocaleString()}${isRent ? "/주" : ""} • ${isRent ? "대여" : "판매"}
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                  <span class="status-badge ${statusClass}">${statusText}</span>
                  <button class="btn btn-secondary" style="padding:6px 12px; font-size:11px;" onclick="navigateTo('detail', {bookId: '${book.id}'})">보기</button>
                </div>
              </div>
            `;
          }).join("") : `
            <p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px 0;">등록한 서적이 없습니다.</p>
          `}
        </div>

        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 16px; border-bottom: 2px solid var(--bg-light); padding-bottom: 8px;">내가 대여 중인 내역</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${myPurchases.length > 0 ? myPurchases.map(rental => {
            const book = books.find(b => b.id === rental.bookId) || { title: "정보가 유실된 도서" };
            return `
              <div style="padding: 12px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: var(--bg-light);">
                <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${book.title}</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px; display: flex; justify-content: space-between; flex-wrap:wrap; gap:6px;">
                  <span>📅 대여 기간: ${rental.startDate} ~ ${rental.endDate}</span>
                  <span style="font-weight:700; color:var(--rent);">총 대여료: ₩${rental.totalPrice.toLocaleString()}원</span>
                </div>
              </div>
            `;
          }).join("") : `
            <p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px 0;">대여 중인 서적이 없습니다.</p>
          `}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 8. 메인 조립 렌더러 (Main Assembly & Layout)
// ==========================================

function renderApp() {
  const root = document.getElementById("app");
  if (!root) return;

  // 전체 레이아웃 구성
  let headerHTML = "";
  let mobileNavHTML = "";
  let viewHTML = "";

  // 비인증 상태
  if (!state.currentUser) {
    viewHTML = renderLandingView();
  } else {
    // 인증 로그인 상태
    headerHTML = renderHeader();
    mobileNavHTML = renderMobileNav();

    if (state.currentView === "explore") {
      viewHTML = renderExploreView();
    } else if (state.currentView === "detail") {
      viewHTML = renderDetailView();
    } else if (state.currentView === "chats") {
      viewHTML = renderChatsView();
    } else if (state.currentView === "register") {
      viewHTML = renderRegisterView();
    } else if (state.currentView === "profile") {
      viewHTML = renderProfileView();
    }
  }

  root.innerHTML = `
    ${headerHTML}
    <div class="main-content">
      ${viewHTML}
    </div>
    ${mobileNavHTML}
  `;

  // 렌더링 후 동적 이벤트 핸들러 바인딩 실행
  bindEvents();
}

function renderHeader() {
  const chats = LocalDB.get("bt_chats", []);
  const myChatsCount = chats.filter(c => c.sellerId === state.currentUser.id || c.buyerId === state.currentUser.id).length;

  return `
    <header>
      <div class="header-container">
        <div class="logo" id="header-logo-btn">
          ${ICONS.book} 북스토크 <span class="logo-tag">UNIV</span>
        </div>
        <nav class="header-nav">
          <button class="nav-link ${state.currentView === 'explore' ? 'active' : ''}" id="btn-nav-explore">도서 매칭</button>
          <button class="nav-link ${state.currentView === 'register' ? 'active' : ''}" id="btn-nav-register">${ICONS.plus} 도서 등록</button>
          <button class="nav-link ${state.currentView === 'chats' ? 'active' : ''}" id="btn-nav-chats">
            채팅방 ${myChatsCount > 0 ? `<span class="nav-badge-dot"></span>` : ""}
          </button>
          <button class="nav-link ${state.currentView === 'profile' ? 'active' : ''}" id="btn-nav-profile">마이페이지</button>
        </nav>
        <div class="user-profile-widget">
          <div class="user-avatar">${state.currentUser.nickname[0]}</div>
          <span class="user-nickname">${state.currentUser.nickname}</span>
          <button class="btn-logout" id="header-btn-logout">로그아웃</button>
        </div>
      </div>
    </header>
  `;
}

function renderMobileNav() {
  const chats = LocalDB.get("bt_chats", []);
  const myChatsCount = chats.filter(c => c.sellerId === state.currentUser.id || c.buyerId === state.currentUser.id).length;

  return `
    <nav class="mobile-nav">
      <div class="mobile-nav-container">
        <button class="mobile-nav-item ${state.currentView === 'explore' ? 'active' : ''}" id="m-btn-nav-explore">
          ${ICONS.book}
          <span>도서매칭</span>
        </button>
        <button class="mobile-nav-item ${state.currentView === 'register' ? 'active' : ''}" id="m-btn-nav-register">
          ${ICONS.plus}
          <span>도서등록</span>
        </button>
        <button class="mobile-nav-item ${state.currentView === 'chats' ? 'active' : ''}" id="m-btn-nav-chats">
          ${ICONS.chat}
          <span>채팅톡</span>
          ${myChatsCount > 0 ? `<span class="mobile-nav-badge">${myChatsCount}</span>` : ""}
        </button>
        <button class="mobile-nav-item ${state.currentView === 'profile' ? 'active' : ''}" id="m-btn-nav-profile">
          ${ICONS.user}
          <span>마이페이지</span>
        </button>
      </div>
    </nav>
  `;
}

// ==========================================
// 9. 동적 이벤트 위임 및 바인딩 (Event Bindings)
// ==========================================

function bindEvents() {
  // 공통 네비게이션
  document.getElementById("header-logo-btn")?.addEventListener("click", () => navigateTo("explore"));
  
  // 헤더 네비게이션
  document.getElementById("btn-nav-explore")?.addEventListener("click", () => navigateTo("explore"));
  document.getElementById("btn-nav-register")?.addEventListener("click", () => navigateTo("explore", { view: "register" })); // Navigate via state
  document.getElementById("btn-nav-chats")?.addEventListener("click", () => navigateTo("chats"));
  document.getElementById("btn-nav-profile")?.addEventListener("click", () => navigateTo("profile"));
  document.getElementById("header-btn-logout")?.addEventListener("click", logout);

  // 모바일 네비게이션
  document.getElementById("m-btn-nav-explore")?.addEventListener("click", () => navigateTo("explore"));
  document.getElementById("m-btn-nav-register")?.addEventListener("click", () => navigateTo("register"));
  document.getElementById("m-btn-nav-chats")?.addEventListener("click", () => navigateTo("chats"));
  document.getElementById("m-btn-nav-profile")?.addEventListener("click", () => navigateTo("profile"));

  // [FR-101] 인증 / 로그인 폼 이벤트
  document.getElementById("btn-switch-signup")?.addEventListener("click", () => {
    state.authMode = "signup";
    state.signupEmail = "";
    state.isEmailVerified = false;
    renderApp();
  });
  document.getElementById("btn-switch-login")?.addEventListener("click", () => {
    state.authMode = "login";
    renderApp();
  });
  
  // 1초 자동로그인
  document.getElementById("btn-quick-login")?.addEventListener("click", () => {
    login("comgong@univ.ac.kr", "1234");
  });

  // 로그인 제출
  document.getElementById("btn-login-submit")?.addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-password").value;
    login(email, pass);
  });

  // 이메일 인증 메일 발송
  document.getElementById("btn-send-code")?.addEventListener("click", () => {
    const email = document.getElementById("signup-email-input").value;
    sendVerificationEmail(email);
  });

  // 이메일 인증 확인
  document.getElementById("btn-verify-code")?.addEventListener("click", () => {
    const code = document.getElementById("signup-code-input").value;
    verifyCode(code);
  });

  // 회원가입 제출
  document.getElementById("btn-signup-submit")?.addEventListener("click", () => {
    const nickname = document.getElementById("signup-nickname").value;
    const pass = document.getElementById("signup-password").value;
    completeSignUp(nickname, pass);
  });

  // [FR-201] 도서 등록 폼 이벤트
  const regDept = document.getElementById("reg-dept");
  const regCourseProf = document.getElementById("reg-course-prof");
  
  // 학과 선택 시 과목 동적 바인딩 및 필터 연동
  regDept?.addEventListener("change", (e) => {
    const dept = e.target.value;
    if (dept) {
      const list = ACADEMIC_DATA[dept] || [];
      regCourseProf.disabled = false;
      regCourseProf.innerHTML = `
        <option value="">과목을 선택하세요</option>
        ${list.map(item => `<option value="${item.course}|${item.professor}">${item.course} (${item.professor})</option>`).join("")}
      `;
    } else {
      regCourseProf.disabled = true;
      regCourseProf.innerHTML = `<option value="">학과를 먼저 선택하세요</option>`;
    }
    validateRegisterForm();
  });

  regCourseProf?.addEventListener("change", validateRegisterForm);
  document.getElementById("reg-title")?.addEventListener("input", validateRegisterForm);
  document.getElementById("reg-author")?.addEventListener("input", validateRegisterForm);
  document.getElementById("reg-price")?.addEventListener("input", validateRegisterForm);

  // 거래 방식에 따른 가격 텍스트 갱신
  const tradeSaleInput = document.querySelector('input[name="reg-trade-type"][value="sale"]');
  const tradeRentInput = document.querySelector('input[name="reg-trade-type"][value="rent"]');
  
  tradeSaleInput?.addEventListener("change", () => {
    document.getElementById("price-input-label").innerText = "판매 가격 (필수)";
    document.getElementById("price-unit-label").innerText = "원";
  });
  tradeRentInput?.addEventListener("change", () => {
    document.getElementById("price-input-label").innerText = "일주일(7일) 기준 대여비 (필수)";
    document.getElementById("price-unit-label").innerText = "원 / 주";
  });

  // 이미지 업로드 파일 셀렉터 동작
  const fileInput = document.getElementById("reg-file-input");
  document.getElementById("btn-upload-trigger")?.addEventListener("click", () => {
    if (state.uploadImages.length >= 5) {
      showToast("이미지는 최대 5장까지만 등록 가능합니다.");
      return;
    }
    fileInput.click();
  });

  fileInput?.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    const slotsAvailable = 5 - state.uploadImages.length;
    const toUpload = files.slice(0, slotsAvailable);

    let loadedCount = 0;
    toUpload.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        state.uploadImages.push(event.target.result); // base64 데이터
        loadedCount++;
        if (loadedCount === toUpload.length) {
          // 업로드 썸네일 새로 렌더링
          renderUploadPreviews();
          validateRegisterForm();
        }
      };
      reader.readAsDataURL(file);
    });
    // 인풋 값 비우기 (동일 파일 재선택 가능하도록)
    fileInput.value = "";
  });

  // 도서 등록 최종 제출
  document.getElementById("book-register-form")?.addEventListener("submit", (e) => {
    const dept = regDept.value;
    const courseProfParts = regCourseProf.value.split("|");
    const tradeType = document.querySelector('input[name="reg-trade-type"]:checked').value;
    
    const formData = {
      title: document.getElementById("reg-title").value,
      author: document.getElementById("reg-author").value,
      deptName: dept,
      courseName: courseProfParts[0],
      profName: courseProfParts[1],
      tradeType: tradeType,
      price: document.getElementById("reg-price").value,
      description: document.getElementById("reg-desc").value
    };

    registerBook(formData);
  });

  // [FR-301] 도서 탐색 필터 및 검색 바 이벤트
  document.getElementById("filter-dept")?.addEventListener("change", (e) => {
    state.filterDept = e.target.value;
    state.filterCourse = "";
    state.filterProf = "";
    renderApp();
  });
  document.getElementById("filter-course")?.addEventListener("change", (e) => {
    state.filterCourse = e.target.value;
    renderApp();
  });
  document.getElementById("filter-prof")?.addEventListener("change", (e) => {
    state.filterProf = e.target.value;
    renderApp();
  });
  
  // 거래 유형 라디오 그룹 바인딩
  const tradeRadios = document.getElementsByName("tradeType");
  tradeRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      state.filterTradeType = e.target.value;
      renderApp();
    });
  });

  // 거래 가능 상품만 보기
  document.getElementById("filter-available")?.addEventListener("change", (e) => {
    state.filterOnlyAvailable = e.target.checked;
    renderApp();
  });

  // 필터 초기화
  document.getElementById("btn-clear-filters")?.addEventListener("click", () => {
    state.filterDept = "";
    state.filterCourse = "";
    state.filterProf = "";
    state.filterTradeType = "all";
    state.filterOnlyAvailable = false;
    state.searchQuery = "";
    renderApp();
  });

  // 검색 버튼 및 인풋
  const searchInput = document.getElementById("search-input");
  document.getElementById("btn-search")?.addEventListener("click", () => {
    state.searchQuery = searchInput.value;
    renderApp();
  });
  searchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      state.searchQuery = searchInput.value;
      renderApp();
    }
  });

  // 도서 리스트에서 상세 페이지 이동
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach(card => {
    card.addEventListener("click", () => {
      const bookId = card.getAttribute("data-book-id");
      navigateTo("detail", { bookId });
    });
  });

  // [FR-302, 303] 도서 상세 뷰 내 이벤트
  document.getElementById("btn-back-to-explore")?.addEventListener("click", () => {
    navigateTo("explore");
  });

  // 이미지 캐러셀 조작
  document.getElementById("btn-prev-img")?.addEventListener("click", () => {
    const book = state.books.find(b => b.id === state.selectedBookId);
    state.activeDetailImageIdx = (state.activeDetailImageIdx - 1 + book.images.length) % book.images.length;
    renderApp();
  });
  document.getElementById("btn-next-img")?.addEventListener("click", () => {
    const book = state.books.find(b => b.id === state.selectedBookId);
    state.activeDetailImageIdx = (state.activeDetailImageIdx + 1) % book.images.length;
    renderApp();
  });
  
  const thumbItems = document.querySelectorAll(".thumb-item");
  thumbItems.forEach(item => {
    item.addEventListener("click", () => {
      state.activeDetailImageIdx = parseInt(item.getAttribute("data-thumb-idx"));
      renderApp();
    });
  });

  // 구매 신청 (즉시 채팅 개설)
  document.getElementById("btn-request-purchase")?.addEventListener("click", () => {
    requestPurchase(state.selectedBookId);
  });

  // 대여 신청 모달 띄우기
  document.getElementById("btn-request-rent-modal")?.addEventListener("click", () => {
    const book = state.books.find(b => b.id === state.selectedBookId);
    const modalHTML = renderRentalModal(book);
    
    // 모달을 body 최하단에 덮기
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-portal";
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // 모달 내 캘린더 날짜 제한 셋업
    const startInput = document.getElementById("rent-start-date");
    const endInput = document.getElementById("rent-end-date");
    const today = new Date().toISOString().split('T')[0];
    startInput.min = today;

    // 시작일에 따른 반납일 하한선 제어 및 실시간 연산
    startInput.addEventListener("change", () => {
      endInput.min = startInput.value;
      calculateRentalCost(book.price);
    });
    endInput.addEventListener("change", () => {
      calculateRentalCost(book.price);
    });

    // 모달 버튼 리스너
    document.getElementById("btn-close-modal").addEventListener("click", closeRentalModal);
    document.getElementById("btn-cancel-rental").addEventListener("click", closeRentalModal);
    document.getElementById("btn-confirm-rental").addEventListener("click", () => {
      const startDate = startInput.value;
      const endDate = endInput.value;
      
      const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 시작일 포함
      const totalPrice = Math.ceil(((diffDays / 7) * book.price) / 100) * 100;

      closeRentalModal();
      requestRental(book.id, startDate, endDate, totalPrice);
    });
  });

  // 1:1 채팅 룸 이벤트
  const chatRoomItems = document.querySelectorAll(".chat-room-item");
  chatRoomItems.forEach(item => {
    item.addEventListener("click", () => {
      const roomId = item.getAttribute("data-room-id");
      navigateTo("chats", { roomId });
    });
  });

  // 모바일 채팅방 목록으로 이동 버튼
  document.getElementById("btn-back-to-chat-list")?.addEventListener("click", () => {
    navigateTo("chats", { roomId: null });
  });

  // 채팅방 내 링크 도서 클릭 시 해당 도서 상세로 이동
  document.getElementById("chat-linked-book")?.addEventListener("click", (e) => {
    const bookId = e.target.getAttribute("data-book-id");
    navigateTo("detail", { bookId });
  });

  // 채팅방 내 판매자 액션: 대여 확정하기
  document.getElementById("btn-seller-confirm-rent")?.addEventListener("click", () => {
    const room = LocalDB.get("bt_chats", []).find(r => r.id === state.selectedChatRoomId);
    if (room) {
      updateBookStatus(room.bookId, "renting", room.id);
      showToast("대여 확정이 완료되었습니다. 교재 거래가 대여 상태로 차단되었습니다.");
    }
  });

  // 채팅방 내 판매자 액션: 거래 완료하기 (중고 판매)
  document.getElementById("btn-seller-confirm-sale")?.addEventListener("click", () => {
    const room = LocalDB.get("bt_chats", []).find(r => r.id === state.selectedChatRoomId);
    if (room) {
      updateBookStatus(room.bookId, "completed");
      showToast("중고 거래가 완료 처리되었습니다.");
    }
  });

  // 메시지 전송
  const chatTextarea = document.getElementById("chat-textarea-input");
  document.getElementById("btn-send-message")?.addEventListener("click", () => {
    if (chatTextarea) {
      sendUserMessage(state.selectedChatRoomId, chatTextarea.value);
      chatTextarea.value = "";
    }
  });
  chatTextarea?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      sendUserMessage(state.selectedChatRoomId, chatTextarea.value);
      chatTextarea.value = "";
    }
  });

  // 마이페이지 로그아웃
  document.getElementById("btn-profile-logout")?.addEventListener("click", logout);
}

// 모달 닫기 유틸
function closeRentalModal() {
  document.getElementById("modal-portal")?.remove();
}

// [FR-303] 대여 실시간 금액 산정 공식 기능
function calculateRentalCost(weeklyPrice) {
  const startVal = document.getElementById("rent-start-date").value;
  const endVal = document.getElementById("rent-end-date").value;
  const daysEl = document.getElementById("calc-days");
  const priceEl = document.getElementById("calc-price");
  const confirmBtn = document.getElementById("btn-confirm-rental");

  if (!startVal || !endVal) {
    daysEl.innerText = "0일";
    priceEl.innerText = "₩0원";
    confirmBtn.disabled = true;
    return;
  }

  const startDate = new Date(startVal);
  const endDate = new Date(endVal);

  if (endDate < startDate) {
    daysEl.innerText = "오류";
    priceEl.innerText = "반납일 확인 필요";
    confirmBtn.disabled = true;
    return;
  }

  // 총 대여 일수 계산 (당일 포함하여 +1 일 계산)
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // 공식 적용: 예상 금액 = (총 대여일수 / 7) * 일주일 대여비
  // 100원 단위 올림(또는 반올림) 처리 규칙 적용
  const rawPrice = (diffDays / 7) * weeklyPrice;
  const roundedPrice = Math.ceil(rawPrice / 100) * 100;

  daysEl.innerText = `${diffDays} 일간 대여`;
  priceEl.innerText = `₩${roundedPrice.toLocaleString()} 원`;
  confirmBtn.disabled = false;
}

// 등록폼 입력 밸리데이션 검사
function validateRegisterForm() {
  const title = document.getElementById("reg-title")?.value || "";
  const author = document.getElementById("reg-author")?.value || "";
  const dept = document.getElementById("reg-dept")?.value || "";
  const courseProf = document.getElementById("reg-course-prof")?.value || "";
  const price = document.getElementById("reg-price")?.value || "";
  const submitBtn = document.getElementById("btn-register-submit");

  if (title.trim() && author.trim() && dept && courseProf && price > 0) {
    if (submitBtn) submitBtn.disabled = false;
  } else {
    if (submitBtn) submitBtn.disabled = true;
  }
}

// 도서 등록 미리보기 썸네일 드로잉
function renderUploadPreviews() {
  const container = document.getElementById("upload-previews-list");
  if (!container) return;

  container.innerHTML = state.uploadImages.map((src, idx) => `
    <div class="upload-preview-item">
      <img src="${src}" class="upload-preview-img" alt="미리보기">
      <button type="button" class="btn-delete-preview" data-delete-idx="${idx}">&times;</button>
    </div>
  `).join("");

  document.getElementById("upload-counter").innerText = `${state.uploadImages.length} / 5 장 첨부됨`;

  // 삭제 버튼 리스너 바인딩
  container.querySelectorAll(".btn-delete-preview").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-delete-idx"));
      state.uploadImages.splice(idx, 1);
      renderUploadPreviews();
      validateRegisterForm();
    });
  });
}

// ==========================================
// 10. 기타 보조 함수 (시간 포맷터 등)
// ==========================================

// 해시코드 생성 (랜덤 표지 프레임 선택용)
String.prototype.hashCode = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

// 상대 시간 텍스트 변환
function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHr < 24) return `${diffHr}시간 전`;
  if (diffDay === 1) return "어제";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 12시간제 시간 표시 (HH:MM)
function formatClockTime(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시 -> 12시
  return `${ampm} ${hours}:${minutes}`;
}

// ==========================================
// 11. 앱 진입점 실행 (Application Launch)
// ==========================================

window.addEventListener("DOMContentLoaded", () => {
  // 초기 지연 모의 렌더 (로딩 스피너 확인용)
  setTimeout(() => {
    renderApp();
  }, 400);
});
