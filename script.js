// JavaScript
class KeksiKlikkeri {
    constructor() {
        this.keksit = 0;
        this.keksitSekunnissa = 0;
        this.klikkausteho = 1;
        
        this.paivitykset = [
            { nimi: 'Kursori', hinta: 15, teho: 0.1, kuvaus: 'Automaattinen keksiklikkeri' },
            { nimi: 'Mummo', hinta: 100, teho: 1, kuvaus: 'Leipoo keksejä sinulle' },
            { nimi: 'Maatila', hinta: 1100, teho: 8, kuvaus: 'Kasvattaa keksiaineksia' },
            { nimi: 'Kaivos', hinta: 12000, teho: 47, kuvaus: 'Louhii suklaahippuja' }
        ];
        
        this.ostetutPaivitykset = [];
        
        this.keksiNappi = document.getElementById('cookie-button');
        this.keksiLaskuri = document.getElementById('cookie-count');
        this.kpsLaskuri = document.getElementById('cps-count');
        this.paivitysKontti = document.getElementById('upgrade-container');
        
        this.keksiNappi.addEventListener('click', () => this.klikkaaKeksia());
        
        this.naytaPaivitykset();
        
        setInterval(() => this.tuotaKekseja(), 1000);
    }
    
    klikkaaKeksia() {
        this.keksit += this.klikkausteho;
        this.paivitaNaytto();
    }
    
    tuotaKekseja() {
        this.keksit += this.keksitSekunnissa;
        this.paivitaNaytto();
    }
    
    paivitaNaytto() {
        this.keksiLaskuri.textContent = `Keksejä: ${Math.floor(this.keksit)}`;
        this.kpsLaskuri.textContent = `Keksejä sekunnissa: ${this.keksitSekunnissa.toFixed(1)}`;
    }
    
    naytaPaivitykset() {
        this.paivitysKontti.innerHTML = '';
        
        this.paivitykset.forEach((paivitys, indeksi) => {
            const paivitysElementti = document.createElement('div');
            paivitysElementti.classList.add('upgrade-item');
            
            paivitysElementti.innerHTML = `
                <div>
                    <strong>${paivitys.nimi}</strong>
                    <p>${paivitys.kuvaus}</p>
                    <small>Hinta: ${paivitys.hinta} 🍪</small>
                </div>
                <button id="paivitys-${indeksi}">Osta</button>
            `;
            
            const ostoNappi = paivitysElementti.querySelector('button');
            ostoNappi.addEventListener('click', () => this.ostaPaivitys(paivitys));
            
            this.paivitysKontti.appendChild(paivitysElementti);
        });
    }
    
    ostaPaivitys(paivitys) {
        if (this.keksit >= paivitys.hinta) {
            this.keksit -= paivitys.hinta;
            this.keksitSekunnissa += paivitys.teho;
            this.ostetutPaivitykset.push(paivitys);
            this.paivitaNaytto();
        } else {
            alert('Ei tarpeeksi keksejä!');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new KeksiKlikkeri();
});
