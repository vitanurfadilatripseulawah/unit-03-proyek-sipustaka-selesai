// ==========================================
// DATA GLOBAL PERPUSTAKAAN SIPUSTAKA
// ==========================================
var dataKoleksi = [
  { id: 1, judul: 'Pemrograman Python Dasar', pengarang: 'Budi Raharjo', kategori: 'Teknologi', status: 'tersedia', tahun: 2023 },
  { id: 2, judul: 'Basis Data Relasional', pengarang: 'Ir. Susi Wulandari', kategori: 'Teknologi', status: 'dipinjam', tahun: 2022 },
  { id: 3, judul: 'Sejarah Nusantara Lengkap', pengarang: 'Prof. Agus Salim', kategori: 'Sejarah', status: 'tersedia', tahun: 2021 },
  { id: 4, judul: 'Matematika Diskrit', pengarang: 'Dr. Hendra Gunawan', kategori: 'Matematika', status: 'tersedia', tahun: 2023 },
  { id: 5, judul: 'Novel Laskar Pelangi', pengarang: 'Andrea Hirata', kategori: 'Fiksi', status: 'dipinjam', tahun: 2005 },
  { id: 6, judul: 'Jaringan Komputer Modern', pengarang: 'Wahyu Nur Cholifah', kategori: 'Teknologi', status: 'tersedia', tahun: 2022 },
  { id: 7, judul: 'Fisika Universitas Jilid 1', pengarang: 'Young & Freedman', kategori: 'Sains', status: 'dipinjam', tahun: 2020 },
  { id: 8, judul: 'Belajar Desain UI/UX', pengarang: 'Rizki Aditya', kategori: 'Teknologi', status: 'tersedia', tahun: 2023 },
  { id: 9, judul: 'Kimia Organik Dasar', pengarang: 'Prof. Hartono', kategori: 'Sains', status: 'tersedia', tahun: 2019 },
  { id: 10, judul: 'Bumi Manusia', pengarang: 'Pramoedya A. Toer', kategori: 'Fiksi', status: 'tersedia', tahun: 1980 }
];

var dataNotifikasi = [
  '⚠️ Buku "Basis Data Relasional" sudah dipinjam 7 hari, segera kembalikan.',
  '📚 5 buku baru telah ditambahkan ke koleksi minggu ini.',
  '🎉 Selamat! Perpustakaan mencapai 500 anggota aktif.'
];

var indeksNotifAktif = 0;

// ===== JAVASCRIPT HALAMAN DASHBOARD =====
var elemenDashboard = document.getElementById('statTotalBuku');

if (elemenDashboard !== null) {
    var jumlahTotal = dataKoleksi.length;
    var jumlahDipinjam = 0;
    
    for (var i = 0; i < dataKoleksi.length; i++) {
        if (dataKoleksi[i].status === 'dipinjam') {
            jumlahDipinjam = jumlahDipinjam + 1;
        }
    }
    
    var jumlahTersedia = jumlahTotal - jumlahDipinjam;
    
    document.getElementById('statTotalBuku').innerHTML = jumlahTotal;
    document.getElementById('statDipinjam').innerHTML = jumlahDipinjam;
    document.getElementById('statTersedia').innerHTML = jumlahTersedia;
    document.getElementById('statAnggota').innerHTML = 47;
    
    var hitungKategori = {};
    for (var j = 0; j < dataKoleksi.length; j++) {
        var kategoriIni = dataKoleksi[j].kategori;
        if (hitungKategori[kategoriIni] === undefined) {
            hitungKategori[kategoriIni] = 0;
        }
        hitungKategori[kategoriIni] = hitungKategori[kategoriIni] + 1;
    }
    
    var warnaKategori = {
        'Teknologi': 'bg-primary',
        'Sejarah':   'bg-warning',
        'Matematika':'bg-info',
        'Fiksi':     'bg-success',
        'Sains':     'bg-danger'
    };
    
    var htmlProgress = '';
    var daftarKategori = Object.keys(hitungKategori);
    
    for (var k = 0; k < daftarKategori.length; k++) {
        var namaKat = daftarKategori[k];
        var jumlahKat = hitungKategori[namaKat];
        var persenKat = Math.round((jumlahKat / jumlahTotal) * 100);
        var warnaBar = warnaKategori[namaKat] || 'bg-secondary';
        
        htmlProgress += '<div class="mb-3">';
        htmlProgress += '<div class="d-flex justify-content-between mb-1">';
        htmlProgress += '<small><strong>' + namaKat + '</strong></small>';
        htmlProgress += '<small>' + jumlahKat + ' buku (' + persenKat + '%)</small>';
        htmlProgress += '</div>';
        htmlProgress += '<div class="progress">';
        htmlProgress += '<div class="progress-bar ' + warnaBar + '" style="width: ' + persenKat + '%" role="progressbar">' + persenKat + '%</div>';
        htmlProgress += '</div>';
        htmlProgress += '</div>';
    }
    
    document.getElementById('areaPogress').innerHTML = htmlProgress;
    
    var bukuTerbaru = dataKoleksi.slice(dataKoleksi.length - 3);
    var barisTabel = '';
    
    for (var m = 0; m < bukuTerbaru.length; m++) {
        var buku = bukuTerbaru[m];
        var badgeStatus = buku.status === 'tersedia' ? '<span class="badge bg-success">Tersedia</span>' : '<span class="badge bg-warning text-dark">Dipinjam</span>';
        
        barisTabel += '<tr>';
        barisTabel += '<td>' + buku.judul + '</td>';
        barisTabel += '<td>' + buku.pengarang + '</td>';
        barisTabel += '<td><span class="badge bg-light text-dark border">' + buku.kategori + '</span></td>';
        barisTabel += '<td>' + badgeStatus + '</td>';
        barisTabel += '</tr>';
    }
    
    document.getElementById('tabelBukuBaru').innerHTML = barisTabel;
    
    document.getElementById('tombolNotif').addEventListener('click', function() {
        var pesanNotif = dataNotifikasi[indeksNotifAktif];
        document.getElementById('isiToast').innerHTML = pesanNotif;
        
        var elemenToast = document.getElementById('toastNotif');
        var toast = new bootstrap.Toast(elemenToast, { delay: 5000 });
        toast.show();
        
        indeksNotifAktif = (indeksNotifAktif + 1) % dataNotifikasi.length;
        var sisaNotif = dataNotifikasi.length - indeksNotifAktif;
        document.getElementById('badgeNotif').innerHTML = sisaNotif;
    });
}

// ===== JAVASCRIPT HALAMAN KOLEKSI BUKU =====
var elemenKoleksi = document.getElementById('tabelKoleksi');

if (elemenKoleksi !== null) {
    function tampilkanKoleksi() {
        var kataCari = document.getElementById('inputCari').value.toLowerCase();
        var kategoriDipilih = document.getElementById('filterKategori').value;
        var statusDipilih = document.getElementById('filterStatus').value;
        
        var hasilFilter = [];
        for (var i = 0; i < dataKoleksi.length; i++) {
            var buku = dataKoleksi[i];
            var judulLower = buku.judul.toLowerCase();
            var pengarangLower = buku.pengarang.toLowerCase();
            
            var cocokTeks = judulLower.indexOf(kataCari) !== -1 || pengarangLower.indexOf(kataCari) !== -1;
            var cocokKategori = (kategoriDipilih === 'semua') || (buku.kategori === kategoriDipilih);
            var cocokStatus = (statusDipilih === 'semua') || (buku.status === statusDipilih);
            
            if (cocokTeks && cocokKategori && cocokStatus) {
                hasilFilter.push(buku);
            }
        }
        
        var pesanKosong = document.getElementById('pesanKosong');
        
        if (hasilFilter.length === 0) {
            elemenKoleksi.innerHTML = '';
            pesanKosong.classList.remove('d-none');
        } else {
            pesanKosong.classList.add('d-none');
            
            var baris = '';
            for (var j = 0; j < hasilFilter.length; j++) {
                var b = hasilFilter[j];
                var badgeKat = '<span class="badge bg-light text-dark border">' + b.kategori + '</span>';
                var badgeSts = b.status === 'tersedia' ? '<span class="badge bg-success">Tersedia</span>' : '<span class="badge bg-warning text-dark">Dipinjam</span>';
                
                baris += '<tr>';
                baris += '<td>' + (j + 1) + '</td>';
                baris += '<td class="fw-semibold">' + b.judul + '</td>';
                baris += '<td>' + b.pengarang + '</td>';
                baris += '<td>' + badgeKat + '</td>';
                baris += '<td>' + b.tahun + '</td>';
                baris += '<td>' + badgeSts + '</td>';
                baris += '<td class="text-center">';
                baris += '<button class="btn btn-sm btn-outline-danger" onclick="tambahFavorit(\'' + b.judul.replace(/'/g, "\\'") + '\')">❤️</button>';
                baris += '</td>';
                baris += '</tr>';
            }
            elemenKoleksi.innerHTML = baris;
        }
        document.getElementById('jumlahTampil').innerHTML = hasilFilter.length;
    }
    
    document.getElementById('inputCari').addEventListener('input', tampilkanKoleksi);
    document.getElementById('filterKategori').addEventListener('change', tampilkanKoleksi);
    document.getElementById('filterStatus').addEventListener('change', tampilkanKoleksi);
    
    tampilkanKoleksi();
}

// ===== JAVASCRIPT HALAMAN PEMINJAMAN (IMPLEMENTASI TANTANGAN 3) =====
var elemenFormPinjam = document.getElementById('formPinjam');

if (elemenFormPinjam !== null) {
    var selectBuku = document.getElementById('pilihBuku');
    
    for (var i = 0; i < dataKoleksi.length; i++) {
        var buku = dataKoleksi[i];
        if (buku.status === 'tersedia') {
            var opsi = document.createElement('option');
            opsi.value = buku.id;
            opsi.textContent = buku.judul + ' - ' + buku.pengarang;
            selectBuku.appendChild(opsi);
        }
    }
    
    var hari_ini = new Date();
    var tahun = hari_ini.getFullYear();
    var bulan = hari_ini.getMonth() + 1;
    var tanggal = hari_ini.getDate();
    
    if (bulan < 10) bulan = '0' + bulan;
    if (tanggal < 10) tanggal = '0' + tanggal;
    
    var formatTanggal = tahun + '-' + bulan + '-' + tanggal;
    document.getElementById('tanggalPinjam').value = formatTanggal;
    
    function tampilkanDaftarPeminjaman() {
        var areaTabel = document.getElementById('tabelPinjaman');
        var wadahUtama = document.getElementById('daftarPinjaman');
        var dataTersimpan = localStorage.getItem('dataPinjaman');
        var daftarPeminjaman = dataTersimpan !== null ? JSON.parse(dataTersimpan) : [];
        
        document.getElementById('badgeJumlahPinjam').innerHTML = daftarPeminjaman.length;
        
        // Jika tidak ada data pinjam aktif, kosongkan tabel dan tampilkan teks pemberitahuan
        if (daftarPeminjaman.length === 0) {
            wadahUtama.innerHTML = '<p class="text-muted text-center py-4">Belum ada peminjaman aktif.</p>';
            return;
        }
        
        // Kembalikan struktur dasar tabel jika sebelumnya sempat kosong (untuk menampung baris baru)
        if (areaTabel === null) {
            var templateTabel = '<div class="table-responsive"><table class="table table-sm table-hover mb-0">';
            templateTabel += '<thead class="table-light"><tr><th>Buku</th><th>Peminjam</th><th>Kembali</th><th>Aksi</th></tr></thead>';
            templateTabel += '<tbody id="tabelPinjaman"></tbody></table></div>';
            wadahUtama.innerHTML = templateTabel;
            areaTabel = document.getElementById('tabelPinjaman');
        }
        
        var barisHtml = '';
        var hariIniObj = new Date(); // Objek waktu saat ini untuk komparasi

        for (var j = 0; j < daftarPeminjaman.length; j++) {
            var p = daftarPeminjaman[j];
            
            // Logika Evaluasi Jatuh Tempo Tantangan 3
            var kelasBaris = '';
            var badgePeringatan = '';
            
            if (p.tanggalKembaliMentah) {
                var tglKembaliObj = new Date(p.tanggalKembaliMentah);
                // Hitung selisih waktu dalam milidetik
                var selisihMilidetik = tglKembaliObj - hariIniObj;
                // Mengonversi milidetik menjadi hitungan hari tunggal
                var sisaHari = selisihMilidetik / (1000 * 60 * 60 * 24);
                
                // Jika sisa waktu peminjaman kurang dari 3 hari lagi
                if (sisaHari < 3) {
                    kelasBaris = 'class="table-danger"';
                    badgePeringatan = ' <span class="badge bg-danger">⚠️ Segera Kembalikan</span>';
                }
            }

            barisHtml += '<tr ' + kelasBaris + '>';
            barisHtml += '<td><small class="fw-semibold">' + p.judulBuku + '</small></td>';
            barisHtml += '<td><small>' + p.namaPeminjam + '</small></td>';
            barisHtml += '<td><small>' + p.tanggalKembali + badgePeringatan + '</small></td>';
            barisHtml += '<td><button class="btn btn-outline-danger btn-sm" onclick="hapusPeminjaman(' + j + ')">Kembalikan</button></td>';
            barisHtml += '</tr>';
        }
        
        areaTabel.innerHTML = barisHtml;
    }
    
    function hapusPeminjaman(indeks) {
        var dataTersimpan = localStorage.getItem('dataPinjaman');
        var daftarPeminjaman = JSON.parse(dataTersimpan);
        var namaBuku = daftarPeminjaman[indeks].judulBuku;
        
        daftarPeminjaman.splice(indeks, 1);
        localStorage.setItem('dataPinjaman', JSON.stringify(daftarPeminjaman));
        
        tampilkanDaftarPeminjaman();
        tampilkanToastPinjam('📖 "' + namaBuku + '" berhasil dikembalikan.');
    }
    
    window.hapusPeminjaman = hapusPeminjaman;
    
    function tampilkanToastPinjam(pesan) {
        document.getElementById('isiToastPinjam').innerHTML = pesan;
        var toast = new bootstrap.Toast(document.getElementById('toastPinjam'), { delay: 4000 });
        toast.show();
    }
    
    elemenFormPinjam.addEventListener('submit', function(event) {
        event.preventDefault();
        
        document.getElementById('pilihBuku').classList.remove('is-invalid');
        document.getElementById('namaPeminjam').classList.remove('is-invalid');
        
        var idBukuDipilih = document.getElementById('pilihBuku').value;
        var nama = document.getElementById('namaPeminjam').value.trim();
        var tglPinjam = document.getElementById('tanggalPinjam').value;
        var durasi = parseInt(document.getElementById('durasiPinjam').value);
        
        var adaError = false;
        if (idBukuDipilih === '') {
            document.getElementById('pilihBuku').classList.add('is-invalid');
            adaError = true;
        }
        if (nama === '') {
            document.getElementById('namaPeminjam').classList.add('is-invalid');
            adaError = true;
        }
        
        if (adaError) return;
        
        var bukuDipilih = null;
        for (var m = 0; m < dataKoleksi.length; m++) {
            if (dataKoleksi[m].id === parseInt(idBukuDipilih)) {
                bukuDipilih = dataKoleksi[m];
                break;
            }
        }
        
        var tglKembali = new Date(tglPinjam);
        tglKembali.setDate(tglKembali.getDate() + durasi);
        
        // Simpan cadangan format ISO mentah ke LocalStorage untuk kalkulasi tanggal akurat
        var tglKembaliMentah = tglKembali.toISOString(); 
        var tglKembaliStr = tglKembali.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        
        var peminjamanBaru = {
            judulBuku: bukuDipilih.judul,
            namaPeminjam: nama,
            tanggalPinjam: tglPinjam,
            tanggalKembali: tglKembaliStr,
            tanggalKembaliMentah: tglKembaliMentah, // Properti pelacak Tantangan 3
            durasi: durasi
        };
        
        var dataTersimpan = localStorage.getItem('dataPinjaman');
        var daftarPeminjaman = dataTersimpan !== null ? JSON.parse(dataTersimpan) : [];
        
        daftarPeminjaman.push(peminjamanBaru);
        localStorage.setItem('dataPinjaman', JSON.stringify(daftarPeminjaman));
        
        tampilkanDaftarPeminjaman();
        tampilkanToastPinjam('✅ Peminjaman "' + bukuDipilih.judul + '" berhasil dicatat!');
        elemenFormPinjam.reset();
        document.getElementById('tanggalPinjam').value = formatTanggal;
    });
    
    tampilkanDaftarPeminjaman();
}

// ===== JAVASCRIPT HALAMAN FAQ (TANTANGAN 2) =====
var elemenAccordion = document.getElementById('accordionFaq');

if (elemenAccordion !== null) {
    var dataFaq = [
        { pertanyaan: 'Berapa lama saya bisa meminjam buku?', jawaban: 'Durasi peminjaman standar adalah 14 hari. Anda dapat memilih 7, 14, atau 21 hari saat melakukan peminjaman melalui halaman Peminjaman.' },
        { pertanyaan: 'Bagaimana cara memperpanjang masa pinjam buku?', jawaban: 'Perpanjangan dapat dilakukan satu kali sebelum tanggal jatuh tempo. Kunjungi meja layanan atau hubungi petugas minimal 2 hari sebelum tanggal pengembalian.' },
        { pertanyaan: 'Apa sanksi jika buku terlambat dikembalikan?', jawaban: 'Keterlambatan dikenakan denda Rp500 per hari per buku. Buku yang rusak atau hilang wajib diganti dengan buku baru dengan judul yang sama.' },
        { pertanyaan: 'Berapa banyak buku yang bisa dipinjam sekaligus?', jawaban: 'Setiap anggota aktif dapat meminjam maksimal 3 buku secara bersamaan. Anggota dengan status "Anggota Istimewa" dapat meminjam hingga 5 buku.' },
        { pertanyaan: 'Bagaimana cara mendaftar sebagai anggota perpustakaan?', jawaban: 'Pendaftaran dilakukan di meja layanan dengan membawa kartu identitas mahasiswa/pegawai yang masih berlaku. Kartu anggota akan diterbitkan dalam 1x24 jam.' }
    ];

    function buatUlangAccordion(daftarFaq) {
        var htmlAccordion = '';
        
        if (daftarFaq.length === 0) {
            elemenAccordion.innerHTML = '<p class="text-muted text-center py-3">Pertanyaan atau jawaban tidak ditemukan.</p>';
            return;
        }

        for (var i = 0; i < daftarFaq.length; i++) {
            var faq = daftarFaq[i];
            var idItem = 'faqItem' + i;
            var idKonten = 'faqKonten' + i;

            htmlAccordion += '<div class="accordion-item">';
            htmlAccordion += '<h2 class="accordion-header" id="' + idItem + '">';
            htmlAccordion += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + idKonten + '" aria-expanded="false" aria-controls="' + idKonten + '">';
            htmlAccordion += faq.pertanyaan;
            htmlAccordion += '</button></h2>';
            htmlAccordion += '<div id="' + idKonten + '" class="accordion-collapse collapse" data-bs-parent="#accordionFaq">';
            htmlAccordion += '<div class="accordion-body">' + faq.jawaban + '</div></div></div>';
        }
        elemenAccordion.innerHTML = htmlAccordion;
    }

    buatUlangAccordion(dataFaq);

    var inputCariFaq = document.getElementById('searchFaq');
    if (inputCariFaq !== null) {
        inputCariFaq.addEventListener('input', function(e) {
            var kataKunci = e.target.value.toLowerCase();
            var hasilFilter = [];

            for (var m = 0; m < dataFaq.length; m++) {
                var itemFaq = dataFaq[m];
                var tanyaLower = itemFaq.pertanyaan.toLowerCase();
                var jawabLower = itemFaq.jawaban.toLowerCase();

                if (tanyaLower.indexOf(kataKunci) !== -1 || jawabLower.indexOf(kataKunci) !== -1) {
                    hasilFilter.push(itemFaq);
                }
            }
            buatUlangAccordion(hasilFilter);
        });
    }
}

// ===== LOGIKA FITUR BUKU FAVORIT GLOBAL =====
function updateBadgeFavorit() {
    var listFavorit = JSON.parse(localStorage.getItem('bukuFavorit')) || [];
    var badge = document.getElementById('badgeFavorit');
    if (badge) {
        badge.innerText = listFavorit.length;
    }
}

function tambahFavorit(judulBuku) {
    var listFavorit = JSON.parse(localStorage.getItem('bukuFavorit')) || [];

    if (listFavorit.indexOf(judulBuku) === -1) {
        listFavorit.push(judulBuku);
        localStorage.setItem('bukuFavorit', JSON.stringify(listFavorit));
        alert('"' + judulBuku + '" berhasil ditambahkan ke favorit!');
    } else {
        alert('"' + judulBuku + '" sudah ada di daftar favorit Anda.');
    }
    updateBadgeFavorit();
}

window.tambahFavorit = tambahFavorit;

document.addEventListener("DOMContentLoaded", function() {
    updateBadgeFavorit();
});