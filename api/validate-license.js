<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ebook Generator Pro</title>
    <!-- Google Fonts & Libraries -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" xintegrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/html-docx-js/dist/html-docx.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    
    <!-- Firebase SDK (akan diisi nanti) -->
    <script type="module" id="firebase-loader">
        // Kode inisialisasi Firebase akan disuntikkan di sini oleh skrip utama
    </script>

    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f1f5f9; color: #334155; margin: 0; padding: 1rem; box-sizing: border-box; }
        .app-container, .auth-container { background-color: #fff; max-width: 64rem; margin-left: auto; margin-right: auto; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
        .auth-container { max-width: 28rem; margin-top: 5rem; }
        .app-header { text-align: center; margin-bottom: 1.5rem; }
        .app-header h1 { font-size: 1.875rem; font-weight: 700; }
        .app-header p { color: #64748b; margin-top: 0.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
        @media (min-width: 1024px) { .form-grid { grid-template-columns: 2fr 1fr 1fr 1fr; } }
        .input-group { position: relative; display: flex; align-items: center; }
        .input-group input { flex-grow: 1; padding-right: 2.5rem; }
        .input-group button { position: absolute; right: 0; top: 0; bottom: 0; border: none; background: transparent; cursor: pointer; padding: 0 0.75rem; color: #4f46e5; display: flex; align-items: center; justify-content: center; }
        .form-grid input, .form-grid select, .form-grid button, .auth-form input { border: 1px solid #cbd5e1; padding: 0.6rem 0.75rem; border-radius: 0.375rem; width: 100%; box-sizing: border-box; height: 42px; }
        .auth-form input { margin-bottom: 1rem; }
        .btn { border: none; cursor: pointer; font-weight: 600; color: white; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 0.375rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); transition: background-color 0.2s; padding: 0.6rem 1rem; }
        .btn-blue { background-color: #3b82f6; } .btn-blue:hover { background-color: #2563eb; }
        .btn-indigo { background-color: #4f46e5; } .btn-indigo:hover { background-color: #4338ca; }
        .btn-green { background-color: #16a34a; } .btn-green:hover { background-color: #15803d; }
        .btn-orange { background-color: #f97316; } .btn-orange:hover { background-color: #ea580c; }
        .btn-red { background-color: #ef4444; } .btn-red:hover { background-color: #dc2626; }
        .btn-full { width: 100%; } .btn:disabled { background-color: #94a3b8; cursor: not-allowed; }
        .table-container { overflow-x: auto; margin-top: 1rem; }
        table { width: 100%; min-width: 700px; border-collapse: collapse; }
        th, td { padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb; text-align: left; white-space: nowrap; }
        td:first-child { white-space: normal; }
        thead { background-color: #f9fafb; }
        tr.processing-row { background-color: #fefce8; }
        .ebook-container { background: white; padding: 2rem; max-width: 8.5in; margin: auto; }
        .ebook-title { font-family: 'Lora', serif; font-size: 2.8rem; font-weight: 700; text-align: center; margin-bottom: 2rem; }
        .ebook-toc h3, .ebook-chapter-title { font-family: 'Lora', serif; font-size: 1.8rem; font-weight: 600; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
        .ebook-toc ul { list-style-type: disc; padding-left: 1.5rem; }
        .ebook-toc li { margin-bottom: 0.5rem; }
        .ebook-chapter { margin-top: 2rem; page-break-before: always; }
        .ebook-chapter-content { font-family: 'Lora', serif; font-size: 1.1rem; line-height: 1.7; text-align: justify; }
        .ebook-chapter-content p { margin-bottom: 1rem; }
        .ebook-chapter-content p:last-child { margin-bottom: 0; }
        .spinner { border: 2px solid rgba(0, 0, 0, 0.1); width: 16px; height: 16px; border-radius: 50%; border-left-color: #09f; animation: spin 1s ease infinite; display: inline-block; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .modal { display: none; position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5); align-items: center; justify-content: center; }
        .modal-content { background-color: #fefefe; padding: 20px; border-radius: 0.5rem; width: 90%; max-width: 900px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .modal-header h1 { font-size: 1.5rem; }
        .modal-body { max-height: 70vh; overflow-y: auto; }
        .modal-footer { display: flex; justify-content: flex-end; margin-top: 1rem; gap: 0.75rem; }
        .close-button { color: #aaa; font-size: 28px; font-weight: bold; cursor: pointer; line-height: 1; }
        .close-button:hover, .close-button:focus { color: black; text-decoration: none; }
        .hidden { display: none !important; }
        #auth-view a { color: #3b82f6; cursor: pointer; text-decoration: underline; }
        .admin-area { border: 2px dashed #eab308; margin-top: 2rem; padding: 1.5rem; border-radius: 0.5rem; background-color: #fefce8; }
        .admin-area h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
    </style>
</head>
<body>

    <!-- Container untuk Autentikasi -->
    <div id="auth-view">
        <div class="auth-container" id="login-container">
            <h2 class="app-header">Login Ebook Generator Pro</h2>
            <form id="login-form" class="auth-form">
                <input type="email" id="login-email" placeholder="Email" required>
                <input type="password" id="login-password" placeholder="Password" required>
                <button type="submit" class="btn btn-indigo btn-full">Login</button>
            </form>
            <p style="text-align:center; margin-top:1rem;">Belum punya akun? <a id="show-register">Register di sini</a></p>
        </div>
        <div class="auth-container hidden" id="register-container">
            <h2 class="app-header">Register Akun Baru</h2>
            <form id="register-form" class="auth-form">
                <input type="text" id="register-name" placeholder="Nama Lengkap" required>
                <input type="tel" id="register-phone" placeholder="Nomor Telepon" required>
                <input type="email" id="register-email" placeholder="Email" required>
                <input type="password" id="register-password" placeholder="Password (min. 6 karakter)" required>
                <button type="submit" class="btn btn-indigo btn-full">Register</button>
            </form>
            <p style="text-align:center; margin-top:1rem;">Sudah punya akun? <a id="show-login">Login di sini</a></p>
        </div>
    </div>

    <!-- Container Aplikasi Utama (tersembunyi) -->
    <div id="app-view" class="hidden">
        <div id="main-container" class="app-container">
             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <p>Login sebagai: <strong id="user-email"></strong></p>
                <div>
                    <button id="admin-area-btn" class="btn btn-blue hidden" style="background-color: #ca8a04;">Area Admin</button>
                    <button id="logout-btn" class="btn btn-red">Logout</button>
                </div>
            </div>
            <div class="app-header">
                <h1>Ebook Generator Pro</h1>
            </div>
            <div class="form-grid">
                <div class="input-group">
                    <input type="text" id="topic" placeholder="Masukkan topik atau ide Anda...">
                    <button id="suggest-topic-btn" title="✨ Beri Saya Ide Topik" disabled>✨</button>
                </div>
                <select id="style">
                    <option value="Santai dan Menarik">Gaya: Santai</option>
                    <option value="Formal dan Edukatif">Gaya: Formal</option>
                    <option value="Inspiratif dan Motivasi">Gaya: Motivasi</option>
                </select>
                <select id="persona">
                    <option value="Pakar di Bidangnya">Persona: Pakar</option>
                    <option value="Jurnalis Investigatif">Persona: Jurnalis</option>
                    <option value="Pencerita yang Handal">Persona: Pencerita</option>
                </select>
                <button id="add-to-queue-btn" class="btn btn-blue">
                    <i data-lucide="plus-circle"></i>
                    <span>Tambah</span>
                </button>
            </div>

            <div>
                <h2>Antrean Ebook</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr><th>Topik</th><th>Gaya</th><th>Persona</th><th>Status</th><th>Aksi</th></tr>
                        </thead>
                        <tbody id="queue-table-body"></tbody>
                    </table>
                </div>
                <p id="empty-queue-msg" style="text-align: center; padding: 1rem; color: #64748b;">Antrean masih kosong.</p>
            </div>

            <div style="margin-top: 2rem;">
                <button id="process-queue-btn" class="btn btn-indigo btn-full" disabled>
                    <i data-lucide="play-circle"></i>
                    <span>Mulai Proses Antrean</span>
                </button>
            </div>

            <div id="admin-view" class="admin-area hidden">
                <h2>Area Admin: Daftar Pengguna</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr><th>Nama</th><th>Email</th><th>No. Telepon</th></tr>
                        </thead>
                        <tbody id="admin-user-list">
                            <tr><td colspan="3" style="text-align:center;">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div id="ebook-modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
             <h1 id="modal-title">Hasil</h1>
             <span class="close-button" id="close-ebook-modal">&times;</span>
        </div>
        <div id="modal-body-content" class="modal-body"></div>
         <div id="modal-footer-content" class="modal-footer"></div>
      </div>
    </div>

    <script type="module">
        // --- FIREBASE INITIALIZATION ---
        // Anda akan mendapatkan ini dari Firebase Console (Lihat Panduan)
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        
        // Suntikkan skrip Firebase
        const firebaseScript = document.createElement('script');
        firebaseScript.type = 'module';
        firebaseScript.innerHTML = `
            import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
            import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
            import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

            const app = initializeApp(${JSON.stringify(firebaseConfig)});
            window.auth = getAuth(app);
            window.db = getFirestore(app);
            window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
            window.signInWithEmailAndPassword = signInWithEmailAndPassword;
            window.onAuthStateChanged = onAuthStateChanged;
            window.signOut = signOut;
            window.doc = doc;
            window.setDoc = setDoc;

            // Panggil event listener setelah Firebase siap
            document.dispatchEvent(new Event('firebase-ready'));
        `;
        document.head.appendChild(firebaseScript);

        // --- GLOBAL APP LOGIC ---
        document.addEventListener('firebase-ready', () => {
            lucide.createIcons();

            let ebookQueue = [];
            let isProcessing = false;

            const authView = document.getElementById('auth-view');
            const appView = document.getElementById('app-view');
            const loginContainer = document.getElementById('login-container');
            const registerContainer = document.getElementById('register-container');
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const showRegisterLink = document.getElementById('show-register');
            const showLoginLink = document.getElementById('show-login');
            const userEmailDisplay = document.getElementById('user-email');
            const logoutBtn = document.getElementById('logout-btn');
            const adminAreaBtn = document.getElementById('admin-area-btn');
            const adminView = document.getElementById('admin-view');
            const adminUserList = document.getElementById('admin-user-list');

            const topicInput = document.getElementById('topic');
            const suggestTopicBtn = document.getElementById('suggest-topic-btn');
            const styleSelect = document.getElementById('style');
            const personaSelect = document.getElementById('persona');
            const addToQueueBtn = document.getElementById('add-to-queue-btn');
            const queueTableBody = document.getElementById('queue-table-body');
            const emptyQueueMsg = document.getElementById('empty-queue-msg');
            const processQueueBtn = document.getElementById('process-queue-btn');

            const ebookModal = document.getElementById('ebook-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body-content');
            const modalFooter = document.getElementById('modal-footer-content');
            const closeEbookModalBtn = document.getElementById('close-ebook-modal');

            // --- AUTHENTICATION LOGIC ---
            onAuthStateChanged(window.auth, user => {
                if (user) {
                    authView.classList.add('hidden');
                    appView.classList.remove('hidden');
                    userEmailDisplay.textContent = user.email;
                    
                    if (user.email === 'poopandastore@gmail.com') {
                        adminAreaBtn.classList.remove('hidden');
                    } else {
                        adminAreaBtn.classList.add('hidden');
                        adminView.classList.add('hidden');
                    }

                } else {
                    authView.classList.remove('hidden');
                    appView.classList.add('hidden');
                }
            });
            
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = loginForm['login-email'].value;
                const password = loginForm['login-password'].value;
                signInWithEmailAndPassword(window.auth, email, password)
                    .catch(error => alert(`Login Gagal: ${error.message}`));
            });

            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = registerForm['register-name'].value;
                const phone = registerForm['register-phone'].value;
                const email = registerForm['register-email'].value;
                const password = registerForm['register-password'].value;

                try {
                    const userCredential = await createUserWithEmailAndPassword(window.auth, email, password);
                    const user = userCredential.user;
                    
                    // Simpan data tambahan ke Firestore
                    await setDoc(doc(window.db, "registeredUsers", user.uid), {
                        name: name,
                        phone: phone,
                        email: email,
                        registeredAt: new Date()
                    });
                    
                    alert('Registrasi berhasil! Anda akan otomatis login.');

                } catch (error) {
                    alert(`Registrasi Gagal: ${error.message}`);
                }
            });

            logoutBtn.addEventListener('click', () => signOut(window.auth));
            
            showRegisterLink.addEventListener('click', () => {
                loginContainer.classList.add('hidden');
                registerContainer.classList.remove('hidden');
            });

            showLoginLink.addEventListener('click', () => {
                registerContainer.classList.add('hidden');
                loginContainer.classList.remove('hidden');
            });
            
            // --- ADMIN AREA LOGIC ---
            adminAreaBtn.addEventListener('click', async () => {
                adminView.classList.toggle('hidden');
                if (!adminView.classList.contains('hidden')) {
                    adminUserList.innerHTML = '<tr><td colspan="3" style="text-align:center;"><div class="spinner"></div> Memuat data...</td></tr>';
                    try {
                        const response = await fetch('/api/admin');
                        if (!response.ok) throw new Error('Gagal mengambil data pengguna.');
                        const users = await response.json();
                        
                        if(users.length > 0) {
                            adminUserList.innerHTML = users.map(user => `
                                <tr>
                                    <td>${user.name || '-'}</td>
                                    <td>${user.email || '-'}</td>
                                    <td>${user.phone || '-'}</td>
                                </tr>
                            `).join('');
                        } else {
                             adminUserList.innerHTML = '<tr><td colspan="3" style="text-align:center;">Belum ada pengguna terdaftar.</td></tr>';
                        }
                    } catch (error) {
                        console.error('Error fetching users:', error);
                        adminUserList.innerHTML = `<tr><td colspan="3" style="color:red; text-align:center;">${error.message}</td></tr>`;
                    }
                }
            });

            // --- MAIN APP LOGIC ---
            topicInput.addEventListener('input', () => {
                suggestTopicBtn.disabled = topicInput.value.trim() === '';
            });

            addToQueueBtn.addEventListener('click', addTopicToQueue);
            processQueueBtn.addEventListener('click', processQueue);
            closeEbookModalBtn.addEventListener('click', () => ebookModal.style.display = 'none');
            window.addEventListener('click', (event) => {
                if (event.target == ebookModal) ebookModal.style.display = 'none';
            });
            
            function addTopicToQueue() {
                const topic = topicInput.value.trim();
                if (topic) {
                    ebookQueue.push({ id: Date.now(), topic, style: styleSelect.value, persona: personaSelect.value, status: 'Menunggu', htmlContent: null });
                    topicInput.value = '';
                    topicInput.focus();
                    renderQueueTable();
                }
            }

            function renderQueueTable() {
                emptyQueueMsg.style.display = ebookQueue.length === 0 ? 'block' : 'none';
                processQueueBtn.disabled = isProcessing || ebookQueue.length === 0;
                
                queueTableBody.innerHTML = ebookQueue.map(item => `
                    <tr id="row-${item.id}" class="${item.status === 'Proses...' ? 'processing-row' : ''}">
                        <td>${item.topic}</td>
                        <td>${item.style}</td>
                        <td>${item.persona}</td>
                        <td class="status-cell">${item.status === 'Proses...' ? '<div class="spinner"></div>' : ''} ${item.status}</td>
                        <td class="action-cell">
                            ${(item.status === 'Selesai' || item.status === 'Gagal (Contoh Dibuat)') ? `<button class="btn btn-green view-result-btn" data-id="${item.id}" style="padding: 0.25rem 0.5rem;"><i data-lucide="eye" style="width:16px;"></i></button>` : ''}
                        </td>
                    </tr>
                `).join('');
                lucide.createIcons();

                document.querySelectorAll('.view-result-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        showEbookInModal(ebookQueue.find(q => q.id === parseInt(e.currentTarget.dataset.id)));
                    });
                });
            }
            
            async function processQueue() {
                isProcessing = true;
                processQueueBtn.disabled = true;

                for (const item of ebookQueue) {
                    if (item.status === 'Menunggu') {
                        updateItemStatus(item.id, 'Proses...');
                        try {
                            item.htmlContent = await generateEbook(item.topic, item.style, item.persona);
                            updateItemStatus(item.id, 'Selesai');
                        } catch (error) {
                            console.error(`Error for "${item.topic}":`, error);
                            item.htmlContent = generateFallbackEbook(item.topic);
                            updateItemStatus(item.id, 'Gagal (Contoh Dibuat)');
                        }
                    }
                }
                
                isProcessing = false;
                processQueueBtn.disabled = ebookQueue.length === 0;
            }

            function updateItemStatus(id, status) {
                const item = ebookQueue.find(q => q.id === id);
                if (item) item.status = status;
                renderQueueTable();
            }

            async function callApi(payload) {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userPayload: payload })
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            }
            
            async function suggestTopics() {
                const idea = topicInput.value.trim();
                if (!idea) return;
                
                modalTitle.textContent = "✨ Ide Topik Ebook";
                modalBody.innerHTML = '<div class="spinner" style="margin: 2rem auto; display:block;"></div>';
                modalFooter.innerHTML = '';
                ebookModal.style.display = 'flex';

                try {
                    const prompt = `Berikan 5 ide topik ebook yang menarik berdasarkan kata kunci: "${idea}". Pisahkan setiap judul dengan baris baru. Jangan beri nomor atau tanda hubung.`;
                    const result = await callApi({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
                    const topics = result.candidates[0].content.parts[0].text.split('\n').filter(t => t.trim().length > 0);

                    const topicList = document.createElement('ul');
                    topicList.id = 'title-suggestion-list';
                    topics.forEach(t => {
                        const li = document.createElement('li');
                        li.textContent = t.replace(/\"/g, '');
                        li.onclick = () => {
                            topicInput.value = li.textContent;
                            ebookModal.style.display = 'none';
                        };
                        topicList.appendChild(li);
                    });
                    modalBody.innerHTML = '';
                    modalBody.appendChild(topicList);
                } catch (error) {
                     modalBody.innerHTML = `<p style="color: red;">Gagal mendapatkan saran topik: ${error.message}</p>`;
                }
            }

            function parseOutline(text) {
                const lines = text.split('\n').filter(line => line.trim() !== '');
                let title = "Judul Ebook";
                const titleLine = lines.find(line => line.match(/\*\*?Judul\*\*?:\s*/i));
                if (titleLine) title = titleLine.replace(/\*\*?Judul\*\*?:\s*/i, '').trim();
                else {
                    const firstLine = lines.find(line => !line.match(/\*\*?Bab\s*\d*:/i));
                    if(firstLine) title = firstLine.trim();
                }

                const chapters = lines.filter(line => line.match(/\*\*?Bab\s*\d*:/i)).map(line => line.replace(/\*\*?Bab\s*\d*:\s*/i, '').trim());
                if (chapters.length === 0) throw new Error("Gagal membuat outline bab.");
                return { title, chapters };
            }

            function saveAsPdf() {
                const element = document.getElementById('modal-ebook-content');
                let fileName = 'ebook.pdf';
                const ebookTitleElement = element.querySelector('.ebook-title');
                if (ebookTitleElement) fileName = ebookTitleElement.textContent.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
                const opt = { margin: [0.5, 0.5, 0.5, 0.5], filename: fileName, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }, pagebreak: { mode: 'css', before: '.ebook-chapter' } };
                html2pdf().set(opt).from(element).save();
            }

            function saveAsDocx() {
                const element = document.getElementById('modal-ebook-content');
                let fileName = 'ebook.docx';
                const ebookTitleElement = element.querySelector('.ebook-title');
                if (ebookTitleElement) fileName = ebookTitleElement.textContent.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.docx';
                const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${element.innerHTML}</body></html>`;
                const converted = htmlDocx.asBlob(content);
                saveAs(converted, fileName);
            }
            
            function formatContent(text) {
                const cleanedText = text.replace(/\n{2,}/g, '\n').replace(/\*/g,'');
                const paragraphs = cleanedText.split('\n').map(p => p.trim()).filter(p => p.length > 0);
                return paragraphs.map(p => `<p>${p}</p>`).join('');
            }
            
            function generateFallbackEbook(topic) {
                const title = `Contoh Ebook: ${topic}`;
                const chapters = [ "Pendahuluan", "Konsep Kunci", "Studi Kasus", "Tantangan dan Solusi", "Kesimpulan" ];
                const placeholderContent = "Ini adalah konten contoh yang ditampilkan karena terjadi kegagalan saat menghubungi server AI.";
                const ebookData = chapters.map(chapterTitle => ({ title: chapterTitle, content: placeholderContent }));
                return renderEbookToHtml(title, ebookData);
            }

            async function generateEbook(topic, style, persona) {
                const promptOutline = `Buatkan outline TEKS SAJA untuk ebook dengan topik "${topic}". Beri judul yang menarik. Buat 5 bab. Format jawaban harus seperti ini, tanpa teks lain:\n**Judul:** [Judul Ebook Di Sini]\n**Bab 1:** [Judul Bab 1]\n**Bab 2:** [Judul Bab 2]\n**Bab 3:** [Judul Bab 3]\n**Bab 4:** [Judul Bab 4]\n**Bab 5:** [Judul Bab 5]`;
                const outlineResult = await callApi({ contents: [{ role: "user", parts: [{ text: promptOutline }] }] });
                const outlineText = outlineResult.candidates[0].content.parts[0].text;
                const { title, chapters } = parseOutline(outlineText);
                
                let ebookData = [];
                for (const chapterTitle of chapters) {
                    const contentPrompt = `Anda adalah seorang penulis dengan persona sebagai **${persona}**. Tulis konten yang bersih dan terformat dengan baik untuk bab buku berjudul "${chapterTitle}" dari ebook bertopik "${topic}". Gunakan gaya bahasa "${style}". Pastikan ada struktur paragraf yang jelas. Panjang tulisan sekitar 400-500 kata.`;
                    const contentResult = await callApi({ contents: [{ role: "user", parts: [{ text: contentPrompt }] }] });
                    const chapterContent = contentResult.candidates[0].content.parts[0].text;
                    ebookData.push({ title: chapterTitle, content: chapterContent });
                }
                return renderEbookToHtml(title, ebookData);
            }
            
            function renderEbookToHtml(title, ebookData) {
                let html = `<h1 class="ebook-title">${title}</h1>`;
                html += `<div class="ebook-toc"><h3 class="ebook-chapter-title">Daftar Isi</h3><ul>`;
                ebookData.forEach((chapter, index) => { html += `<li>Bab ${index + 1}: ${chapter.title}</li>`; });
                html += `</ul></div>`;
                ebookData.forEach((chapter, index) => {
                    html += `<div class="ebook-chapter">
                                <h2 class="ebook-chapter-title">Bab ${index + 1}: ${chapter.title}</h2>
                                <div class="ebook-chapter-content">${formatContent(chapter.content)}</div>
                             </div>`;
                });
                return html;
            }

            function showEbookInModal(item) {
                const isFallback = item.status.includes('Contoh');
                const ebookTitle = item.htmlContent.match(/<h1 class="ebook-title">(.*?)<\/h1>/)[1];
                modalTitle.textContent = isFallback ? `Contoh: ${item.topic}` : ebookTitle;
                modalBody.innerHTML = `<div id="modal-ebook-content">${item.htmlContent}</div>`;
                
                modalFooter.innerHTML = `
                    <button id="modal-save-docx-btn" class="btn btn-orange">
                        <i data-lucide="file-text"></i><span>Download (.docx)</span>
                    </button>
                     <button id="modal-save-pdf-btn" class="btn btn-green">
                        <i data-lucide="download"></i><span>Simpan PDF</span>
                    </button>
                `;
                lucide.createIcons();
                
                document.getElementById('modal-save-pdf-btn').addEventListener('click', saveAsPdf);
                document.getElementById('modal-save-docx-btn').addEventListener('click', saveAsDocx);

                ebookModal.style.display = 'flex';
            }
            
            renderQueueTable();
        });
    </script>
</body>
</html>
