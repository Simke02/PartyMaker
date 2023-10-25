export class Alkoholna{
    id: number;
    naziv: string;
    proizvodjac: string;
    cena: number;
    kratakOpis: string;
    dostupnaKolicina: number;
    slika: string;
    vremeDodavanja: Date;
    litraza: number;
    vrsta: VrstaAlkohola;
    procenatAlkohola: number;
}

export class AlkoholnaP{
    naziv: string;
    proizvodjac: string;
    cena: number;
    kratakOpis: string;
    dostupnaKolicina: number;
    slika: string;
    vremeDodavanja: Date;
    litraza: number;
    vrsta: VrstaAlkohola;
    procenatAlkohola: number;
}

export enum VrstaAlkohola
{
    Pivo = 0,
    BeloVino = 1,
    CrnoVino = 2,
    Roze = 3,
    Viski = 4,
    Votka = 5,
    Sampanjac = 6,
    Dzin = 7,
    Konjak = 8,
    Burbon = 9,
    Tekila = 10,
    Liker = 11,
    Rum = 12,
    Vinjak = 13,
    Razno = 14
}