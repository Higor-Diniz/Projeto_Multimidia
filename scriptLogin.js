function showRegisterForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  }

  function showLoginForm() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }

  function registerUser(event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Salvar e-mail e senha no Local Storage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Cadastro realizado com sucesso!");
    showLoginForm();
  }

  function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Obter e-mail e senha salvos no Local Storage
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
      alert("Login realizado com sucesso!");
      // Redirecionar para a página principal ou abrir o sistema
      window.location.href = "layout.html"; // Exemplo de redirecionamento
    } else {
      alert("E-mail ou senha incorretos.");
    }
  }