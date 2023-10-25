export class Rekviziti{
    id: number;
    naziv: string;
    proizvodjac: string;
    cena: number;
    kratakOpis: string;
    dostupnaKolicina: number;
    slika: string;
    vremeDodavanja: Date;
    tip: TipRekvizita;
}

export class RekvizitiP{
    naziv: string;
    proizvodjac: string;
    cena: number;
    kratakOpis: string;
    dostupnaKolicina: number;
    slika: string;
    vremeDodavanja: Date;
    tip: TipRekvizita;
}


export enum TipRekvizita
{
    Baloni = 0,
    Pinjate = 1,
    Ketering = 2,
    Dekor = 3,
    Kostimi = 4,
    Razno = 5
}