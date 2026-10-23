/* ==========================================================================
   content.js — toàn bộ chữ hiển thị trên trang, tách riêng theo ngôn ngữ.
   Muốn sửa câu chữ thì chỉ cần sửa file này, không phải động vào index.html.
   Key trùng với thuộc tính data-i18n="..." trong index.html.
   ========================================================================== */

window.PORTFOLIO_CONTENT = {
  vi: {
    "meta.title": "Trần Huỳnh Giác — Sinh viên Kỹ thuật Phần mềm, Java Backend",

    "nav.about": "Giới thiệu",
    "nav.skills": "Kỹ năng",
    "nav.projects": "Dự án",
    "nav.education": "Học vấn",
    "nav.contact": "Liên hệ",

    "ui.toggleTheme": "Đổi giao diện sáng/tối",
    "ui.stack": "Công nghệ:",
    "ui.sourceCode": "Xem mã nguồn trên GitHub",
    "ui.copy": "Sao chép",
    "ui.copyDone": "Đã sao chép",
    "ui.copyFailed": "Trình duyệt không cho sao chép, bạn hãy bôi đen và copy thủ công nhé.",

    "hero.greeting": "Chào bạn, mình là",
    "hero.role": "Sinh viên Kỹ thuật Phần mềm, đang tìm chỗ thực tập Java Backend",
    "hero.intro": "Mình học ở FPT University Cần Thơ và thích những phần backend mà người dùng không bao giờ nhìn thấy: một giao dịch không bị trừ tiền hai lần, kho hàng không bán lố, tài khoản admin không bị dò mật khẩu. Hai học kỳ vừa rồi mình làm một web bán sách từ đầu — lần đầu bằng Servlet và JDBC thuần, lần sau làm lại bằng Spring Boot.",
    "hero.ctaProjects": "Xem dự án",
    "hero.ctaContact": "Liên hệ mình",
    "hero.location": "Ninh Kiều, Cần Thơ",

    "about.title": "Về mình",
    "about.p1": "Mình bắt đầu với Servlet và JDBC thuần, nên phải tự tay mở transaction, commit, rollback và gom batch. Nhờ vậy khi chuyển sang Spring Boot mình biết @Transactional và JPA đang làm gì phía sau, thay vì dùng cho có.",
    "about.p2": "Mình có dùng AI khi code, nhưng luôn viết đặc tả và test trước rồi mới nhờ AI, và đọc lại từng đoạn nó sinh ra. Cũng nhờ thói quen đó mà dự án mới có hơn 150 test.",

    "skills.title": "Kỹ năng",
    "skills.foundation.label": "Nền tảng",
    "skills.foundation.value": "Cấu trúc dữ liệu & giải thuật, OOP, SOLID",
    "skills.languages.label": "Ngôn ngữ",
    "skills.backend.label": "Backend",
    "skills.database.label": "Cơ sở dữ liệu",
    "skills.tools.label": "Kiểm thử & công cụ",

    "projects.title": "Dự án",

    "p1.title": "AureliaBooks v2.0 — web bán sách và quản lý kho",
    "p1.meta": "SWP391 · 07/2026 – nay · phụ trách bảo mật, thanh toán và các dịch vụ nền",
    "p1.summary": "Bản làm lại của v1.0 bằng Spring Boot, có thanh toán VNPay, phân quyền và quản lý kho.",
    "p1.b1": "Thanh toán VNPay: kiểm tra chữ ký HMAC-SHA512 của IPN và xử lý idempotent để một giao dịch gửi về hai lần vẫn chỉ được ghi một lần. Khi trừ kho thì khóa các dòng sản phẩm theo thứ tự ID tăng dần, nên hai đơn mua chéo nhau không bị deadlock hay bán vượt tồn kho.",
    "p1.b2": "Đăng nhập và phân quyền: 4 vai trò, tự khóa tạm tài khoản Admin khi nhập sai nhiều lần, và thu hồi phiên đăng nhập ngay lập tức bằng SessionRegistry.",
    "p1.b3": "Audit log bằng Spring AOP (có che dữ liệu nhạy cảm) cùng vài job chạy nền: đối soát thanh toán, hoàn kho cho đơn hết hạn, dọn phiên cũ.",
    "p1.b4": "Viết hơn 150 test bằng JUnit 5, Mockito và MockMvc, tập trung vào thanh toán, xử lý đồng thời và bảo mật.",

    "p2.title": "AureliaBooks v1.0 — quản lý đơn hàng, đổi trả và tồn kho",
    "p2.meta": "PRJ301 · 04/2026 – 07/2026 · phụ trách phần đơn hàng, đổi trả và checkout",
    "p2.summary": "Bản đầu tiên, làm bằng Servlet/JSP và không dùng framework nào cho tầng dữ liệu.",
    "p2.b1": "Tự quản lý transaction bằng JDBC: tắt auto-commit, gom batch để cập nhật đơn hàng, chi tiết đơn và tồn kho trong cùng một giao dịch, có lỗi thì rollback.",
    "p2.b2": "Làm luồng trả hàng để cộng lại tồn kho, và phân trang phía server trên SQL Server.",

    "p3.title": "Pikachu — game nối hình cổ điển",
    "p3.meta": "CSD201 · 04/2026 – 07/2026 · phụ trách thuật toán dồn ô và kiểm thử",
    "p3.summary": "Bài tập lớn môn cấu trúc dữ liệu: bàn cờ nối hình giống game Pikachu hồi nhỏ.",
    "p3.b1": "Viết 4 hàm dồn ô theo 4 hướng, chạy trong O(R×C) và không dùng thêm mảng phụ.",
    "p3.b2": "Kiểm tra hai ô có nối được không bằng BFS giới hạn tối đa 2 lần rẽ, kèm vài ma trận kiểm thử để phát hiện bàn cờ hết nước đi.",

    "edu.title": "Học vấn",
    "edu.school": "Đại học FPT Cần Thơ",
    "edu.major": "Kỹ thuật Phần mềm · 09/2024 – 2028",
    "edu.gpa": "GPA 3.67/4.0, đạt danh hiệu Sinh viên Giỏi học kỳ.",
    "edu.coursesLabel": "Các môn đã học:",
    "edu.courses": "Cấu trúc dữ liệu & giải thuật (CSD201), OOP với Java (PRO192), Hệ cơ sở dữ liệu (DBI202), Lập trình web Java (PRJ301, HSF302), Kiểm thử phần mềm (SWT301), Dự án phần mềm (SWP391).",
    "edu.certsTitle": "Chứng chỉ",

    "contact.title": "Liên hệ",
    "contact.text": "Nếu bạn đang tìm thực tập sinh Java Backend, hoặc chỉ muốn góp ý cho các dự án của mình, cứ nhắn mình nhé.",
    "contact.email": "Email",
    "contact.phone": "Điện thoại",
    "contact.github": "GitHub",

    "footer.text": "© 2026 Trần Huỳnh Giác. Viết bằng HTML, CSS và JavaScript thuần."
  },

  en: {
    "meta.title": "Tran Huynh Giac — Software Engineering student, Java Backend",

    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.contact": "Contact",

    "ui.toggleTheme": "Switch between light and dark theme",
    "ui.stack": "Stack:",
    "ui.sourceCode": "View source on GitHub",
    "ui.copy": "Copy",
    "ui.copyDone": "Copied",
    "ui.copyFailed": "Your browser blocked copying. Please select the text and copy it manually.",

    "hero.greeting": "Hi, I'm",
    "hero.role": "Software Engineering student, looking for a Java Backend internship",
    "hero.intro": "I study at FPT University Can Tho and I like the backend parts users never see: a payment that is never charged twice, stock that never oversells, an admin account that can't be brute-forced. Over the last two semesters I built a bookstore from scratch — first with plain Servlets and JDBC, then again with Spring Boot.",
    "hero.ctaProjects": "See my projects",
    "hero.ctaContact": "Get in touch",
    "hero.location": "Ninh Kieu, Can Tho",

    "about.title": "About me",
    "about.p1": "I started with plain Servlets and JDBC, so I had to open transactions, commit, roll back and batch statements by hand. That's why, after moving to Spring Boot, I know what @Transactional and JPA are doing underneath instead of using them blindly.",
    "about.p2": "I do use AI when coding, but I write the spec and the tests first, then ask the AI, and I read every piece it generates. That habit is also why the newer project has more than 150 tests.",

    "skills.title": "Skills",
    "skills.foundation.label": "Foundations",
    "skills.foundation.value": "Data structures & algorithms, OOP, SOLID",
    "skills.languages.label": "Languages",
    "skills.backend.label": "Backend",
    "skills.database.label": "Databases",
    "skills.tools.label": "Testing & tools",

    "projects.title": "Projects",

    "p1.title": "AureliaBooks v2.0 — bookstore and warehouse management",
    "p1.meta": "SWP391 · 07/2026 – present · in charge of security, payments and platform services",
    "p1.summary": "A rebuild of v1.0 on Spring Boot, with VNPay payments, role-based access and inventory management.",
    "p1.b1": "VNPay payments: verify the HMAC-SHA512 signature of the IPN and handle it idempotently, so a notification delivered twice is still recorded once. When deducting stock, product rows are locked in ascending ID order, so two orders buying the same items in opposite order can't deadlock or oversell.",
    "p1.b2": "Login and access control: 4 roles, a temporary lockout for the Admin account after repeated failed logins, and instant session revocation through SessionRegistry.",
    "p1.b3": "An audit log built with Spring AOP (sensitive data is masked) plus a few background jobs: payment reconciliation, restoring stock for expired orders, and cleaning up stale sessions.",
    "p1.b4": "Wrote 150+ tests with JUnit 5, Mockito and MockMvc, focused on payments, concurrency and security.",

    "p2.title": "AureliaBooks v1.0 — order, return and inventory management",
    "p2.meta": "PRJ301 · 04/2026 – 07/2026 · in charge of orders, returns and checkout",
    "p2.summary": "The first version, built with Servlet/JSP and no framework on the data layer.",
    "p2.b1": "Managed transactions by hand with JDBC: auto-commit off, batched updates to orders, order items and stock in a single transaction, rollback on any failure.",
    "p2.b2": "Built the return flow that puts items back into stock, plus server-side pagination on SQL Server.",

    "p3.title": "Pikachu — a classic tile-matching game",
    "p3.meta": "CSD201 · 04/2026 – 07/2026 · in charge of the tile-shifting algorithms and testing",
    "p3.summary": "A data structures course project: a tile-matching board like the Pikachu game from childhood.",
    "p3.b1": "Wrote 4 shifting functions, one per direction, running in O(R×C) with no extra array.",
    "p3.b2": "Checks whether two tiles connect using a BFS limited to 2 turns, plus a few test matrices to detect a board with no moves left.",

    "edu.title": "Education",
    "edu.school": "FPT University Can Tho",
    "edu.major": "Software Engineering · 09/2024 – 2028",
    "edu.gpa": "GPA 3.67/4.0, Semester Honorable Student.",
    "edu.coursesLabel": "Courses taken:",
    "edu.courses": "Data Structures & Algorithms (CSD201), OOP with Java (PRO192), Database Systems (DBI202), Java Web Development (PRJ301, HSF302), Software Testing (SWT301), Software Development Project (SWP391).",
    "edu.certsTitle": "Certificates",

    "contact.title": "Contact",
    "contact.text": "If you're hiring a Java Backend intern, or just want to give feedback on my projects, feel free to message me.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.github": "GitHub",

    "footer.text": "© 2026 Tran Huynh Giac. Written in plain HTML, CSS and JavaScript."
  }
};
