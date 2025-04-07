class KeksiKlikkeri {
    constructor() {
        this.keksit = 0;
        this.keksitSekunnissa = 0;
        this.klikkausteho = 1;

        this.paivitykset = [
            { nimi: 'Kursori', hinta: 15, tyyppi: 'perus', teho: 0.1, kuvaus: 'Automaattinen keksiklikkeri', maara: 0 },
            { nimi: 'Mummo', hinta: 100, tyyppi: 'perus', teho: 1, kuvaus: 'Leipoo keksejä hitaasti mutta varmasti', maara: 0 },
            { nimi: 'Maatila', hinta: 1100, tyyppi: 'satunnainen', teho: 20, kuvaus: 'Kasvattaa satunnaisesti keksejä', maara: 0 },
            { nimi: 'Kaivos', hinta: 12000, tyyppi: 'hidasIso', teho: 500, kuvaus: 'Louhii paljon keksejä hitaasti', maara: 0 },
            { nimi: 'Tehdas', hinta: 130000, tyyppi: 'skaalaava', teho: 50, kuvaus: 'Teho kasvaa mitä enemmän omistat', maara: 0 },
            { nimi: 'Aikakone', hinta: 1400000, tyyppi: 'purske', teho: 3000, kuvaus: 'Tekee purskeita keksejä', maara: 0 },
            { nimi: 'Avaruusasema', hinta: 20000000, tyyppi: 'klikkausBonus', teho: 1, kuvaus: 'Antaa lisäkeksejä klikkauksesta', maara: 0 },
            { nimi: 'Muffinssiportti', hinta: 330000000, tyyppi: 'boosteri', teho: 0.1, kuvaus: 'Tehostaa kaikkia tuotantoja', maara: 0 }
        ];

        this.keksiNappi = document.getElementById('cookie-button');
        this.keksiLaskuri = document.getElementById('cookie-count');
        this.kpsLaskuri = document.getElementById('cps-count');
        this.paivitysKontti = document.getElementById('upgrade-container');
        this.toggleMenuButton = document.getElementById('toggle-upgrade-menu');
        this.upgradeMenu = document.getElementById('upgrade-menu');

        this.keksiNappi.addEventListener('click', () => this.klikkaaKeksia());
        this.toggleMenuButton.addEventListener('click', () => this.toggleUpgradeMenu());

        // Check screen size on load and resize
        this.checkScreenSize();
        window.addEventListener('resize', () => this.checkScreenSize());

        this.naytaPaivitykset();

        setInterval(() => this.tuotaKekseja(), 1000);
        setInterval(() => this.erikoistuotannot(), 5000);
    }

    checkScreenSize() {
        this.isSmallScreen = window.innerWidth <= 768;
        // Reset menu state when screen size changes
        this.upgradeMenu.style.transform = this.isSmallScreen ? 
            'scaleY(0)' : 'translateY(-50%) scaleX(0)';
        this.toggleMenuButton.textContent = 'Avaa ostovalikko';
    }

    klikkaaKeksia() {
        let bonus = this.paivitykset.find(p => p.tyyppi === 'klikkausBonus')?.maara || 0;
        this.keksit += this.klikkausteho + bonus;
        this.paivitaNaytto();
    }

    tuotaKekseja() {
        let kps = 0;

        this.paivitykset.forEach(p => {
            if (p.tyyppi === 'perus') {
                kps += p.teho * p.maara;
            }
            if (p.tyyppi === 'skaalaava') {
                kps += (p.teho * p.maara) * (1 + p.maara * 0.1);
            }
            if (p.tyyppi === 'boosteri') {
                kps *= (1 + p.teho * p.maara);
            }
        });

        this.keksit += kps;
        this.keksitSekunnissa = kps;
        this.paivitaNaytto();
    }

    erikoistuotannot() {
        this.paivitykset.forEach(p => {
            if (p.tyyppi === 'satunnainen' && p.maara > 0) {
                let satunnaiset = Math.floor(Math.random() * p.teho * p.maara);
                this.keksit += satunnaiset;
            }
            if (p.tyyppi === 'hidasIso' && p.maara > 0) {
                this.keksit += p.teho * p.maara;
            }
            if (p.tyyppi === 'purske' && p.maara > 0 && Math.random() < 0.5) {
                this.keksit += p.teho * p.maara;
            }
        });

        this.paivitaNaytto();
    }

    paivitaNaytto() {
        this.keksiLaskuri.textContent = `Keksejä: ${Math.floor(this.keksit)}`;
        this.kpsLaskuri.textContent = `Keksejä sekunnissa: ${this.keksitSekunnissa.toFixed(1)}`;
        this.naytaPaivitykset();
    }

    naytaPaivitykset() {
        this.paivitysKontti.innerHTML = '';

        this.paivitykset.forEach((paivitys, indeksi) => {
            const paivitysElementti = document.createElement('div');
            paivitysElementti.classList.add('upgrade-item');

            paivitysElementti.innerHTML = `
                <div>
                    <strong>${paivitys.nimi}</strong> (x${paivitys.maara})
                    <p>${paivitys.kuvaus}</p>
                    <small>Hinta: ${Math.floor(paivitys.hinta)} 🍪</small>
                </div>
                <button id="paivitys-${indeksi}">Osta</button>
            `;

            const ostoNappi = paivitysElementti.querySelector('button');
            ostoNappi.addEventListener('click', () => this.ostaPaivitys(indeksi));

            this.paivitysKontti.appendChild(paivitysElementti);
        });
    }

    ostaPaivitys(indeksi) {
        const paivitys = this.paivitykset[indeksi];

        if (this.keksit >= paivitys.hinta) {
            this.keksit -= paivitys.hinta;
            paivitys.maara += 1;
            paivitys.hinta *= 1.15;
            this.paivitaNaytto();
        } else {
            alert('Ei tarpeeksi keksejä!');
        }
    }

    toggleUpgradeMenu() {
        if (this.isSmallScreen) {
            // For small screens (mobile)
            const isOpen = this.upgradeMenu.style.transform === 'scaleY(1)';
            
            if (isOpen) {
                this.upgradeMenu.style.transform = 'scaleY(0)';
                this.toggleMenuButton.textContent = 'Avaa ostovalikko';
            } else {
                this.upgradeMenu.style.transform = 'scaleY(1)';
                this.toggleMenuButton.textContent = 'Sulje ostovalikko';
            }
        } else {
            // For larger screens (desktop)
            const isOpen = this.upgradeMenu.style.transform === 'translateY(-50%) scaleX(1)';
            
            if (isOpen) {
                this.upgradeMenu.style.transform = 'translateY(-50%) scaleX(0)';
                this.toggleMenuButton.textContent = 'Avaa ostovalikko';
            } else {
                this.upgradeMenu.style.transform = 'translateY(-50%) scaleX(1)';
                this.toggleMenuButton.textContent = 'Sulje ostovalikko';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new KeksiKlikkeri();
});