window.onload = () => {
  
  // batas skor 
  const limit = 3;
  // skor pemain dan komputer
  let playerScore = 0;
  let computerScore = 0;
  // element html
  const player = document.querySelector('.player');
  const computer = document.querySelector('.computer');
  const icon = document.querySelector('#big-icon');
  const button = document.querySelectorAll('.button');
  button.forEach(btn => {
    // ketika tombol ditekan
    btn.addEventListener('click', function() {
      // ambil value dari atribut data-value
      const value = this.dataset.value.toLowerCase();
      // set pilihan komputer
      const comp = setComputer();
      // tentukan hasil dari pilihan pemain dan pilihan komputer
      const result = setGames(value, comp);
      // tampilkan hasilnya
      showAlert(value, comp, result);
      // set score antara pemain dan komputer
      setScore(result);
      // tentukan pemenang dari game ini
      getWinner();
    });
  });
  
  function setComputer() {
    // dapatkan angka acak
    const number = Math.round(Math.random() * 2);
    /*
      ubah class icon sesuai pilihan komputer, jika class berubah
      maka bentuk icon pun ikut berubah
    */
    icon.className = setIcon(number);
    /*
      mengembalikan nilai berupa pilihan komputer
      apakah rock, paper atau scissor
    */
    return getComputer(number);
  }
  
  function setIcon(number) {
    switch (number) {
      // jika menghasilkan angka 1, ubah bentuk icon menjadi icon tangan menggenggam (rock)
      case 0 : return 'fa-solid fa-hand-back-fist';
      // jika menghasilkan angka 2, ubah bentuk icon menjadi icon tangan terbuka (paper)
      case 1 : return 'fa-solid fa-hand';
      // jika menghasilkan angka 3, ubah bentuk icon menjadi icon tangan bentuk gunting (scissor)
      case 2 : return 'fa-solid fa-hand-scissors';
    }
  }
  
  function getComputer(number) {
    // string kosong
    let str = '';
    switch (number) {
      // jika menghasilkan angka 0, maka komputer memilih batu
      case 0 : str = 'rock'; break;
      // jika menghasilkan angka 1, maka komputer memilih kertas
      case 1 : str = 'paper'; break;
      // jika menghasilkan angka 2, maka komputer memilih gunting
      case 2 : str = 'scissor'; break;
    }
    /*
      kembalikan nilai berupa pilihan komputer.
      mengapa saya memakai variabel str? supaya
      saya bisa membuat teks dari pilihan komputer
      menjadi huruf kecil semua guna menghindari kesalahan
      hanya karena beda huruf kecil dan besar dengan pilihan pemain
    */
    return str.toLowerCase();
  }
  
  function setGames(value, comp) {
    // jika pilihan pemain dan komputer itu sama
    if (value == comp) return 'draw';
    // jika pemain memilih batu dan komputer memilih gunting
    if (value == 'rock') return (comp == 'scissor') ? 'win' : 'lose';
    // jika pemain memilih kertas dan komputer memilih batu
    if (value == 'paper') return (comp == 'rock') ? 'win' : 'lose';
    // jika pemain memilih gunting dan komputer memilih kertas
    if (value == 'scissor') return (comp == 'paper') ? 'win' : 'lose';
  }
  
  function showAlert(value, comp, result) {
    /*
      berfungsi untuk menampilkan pilihan pemain
      dan juga komputer. serta hasil akhirnya
    */
    alert(`
      player choose : ${value}
      computer choose : ${comp}
      and then, the result is : player ${result}
    `);
  }
  
  function setScore(result) {
    // jika parameter result menghasilkan teks bertuliskan 'win'
    if (result.toLowerCase() == 'win') {
      // tambahkan skor untuk pemain
      playerScore++;
      // set score kedalam element
      player.textContent = playerScore;
    } else if (result.toLowerCase() == 'lose') {
      /*
        jika parameter result menghasilkan teks bertuliskan 'lose'
        maka, pihak komputerlah yang menang.
        tambahkan skor untuk pihak komputer
      */
      computerScore++;
      // set score kedalam element
      computer.textContent = computerScore;
    }
  }
  
  function getWinner() {
    // jika jumlah skor pemain itu sama dengan batas skor, yaitu 3
    if (playerScore == limit) {
      // tampilkan pesan
      alert('Congratulation! you are the winner!');
      // tanyakan, apakah ingin main lagi
      again();
    } else if (computerScore == limit) {
      /*
        jika jumlah skor komputer sama dengan batas skor, yaitu 3.
        maka tampilkan pesan
      */
      alert('You Lose!');
      // tanyakan, apakah ingin main lagi
      again();
    }
  }
  
  function again() {
    // jika pemain menekan tombol ok atau yes
    const ask = confirm('do you want to play again?');
    if (ask == true) {
      // tampilkan alert
      alert('let\'s play again!');
      // bersihkan skor
      clear();
    } else {
      // jika pemain menekan tombol no
      alert('thanks for playing with us!');
      // matikan semua tombol
      button.forEach(btn => btn.setAttribute('disabled', true));
    }
  }
  
  function clear() {
    // bersihkan skor
    playerScore = 0;
    computerScore = 0;
    player.textContent = playerScore;
    computer.textContent = computerScore;
  }
  
}