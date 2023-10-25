export class Bezalkoholna{
    id: number;
    naziv: string;
    proizvodjac: string;
    cena: number;
    kratakOpis: string;
    dostupnaKolicina: number;
    slika: string;
    vremeDodavanja: Date;
    litraza: number;
    gazirano: boolean;
    ukus: Ukus;
}

export class BezalkoholnaP{
    naziv: string;
    proizvodjac: string;
    cena: number;
    kratakOpis: string;
    dostupnaKolicina: number;
    slika: string;
    vremeDodavanja: Date;
    litraza: number;
    gazirano: boolean;
    ukus: Ukus;
}

export enum Ukus
{
    Jabuka = 0,
    Narandža = 1,
    Limunada = 2,
    Grejpfrut = 3,
    Breskva = 4,
    Kruška = 5,
    Ananas = 6,
    Manga = 7,
    Borovnica = 8,
    Malina = 9,
    Brusnica = 10,
    Višnja = 11,
    Grožđe = 12,
    Kajsija = 13,
    Šljiva = 14,
    Lubenica = 15,
    Limeta = 16,
    Cola = 17
}