import { ProizvodNarudzbine, ProizvodNarudzbineP } from "./proizvodNarudzbine.model";

export class Narudzbina{
    id:number;
    statusPorudzine: Status; //req
    suma: number; //req
    vremeKreiranja: Date; //req 
    potI: number;
    licnoIme: string;
    prezime: string;
    emailKup: string; 
    drzava: string;
    grad: string;
    postanskiBroj: string;
    adresa: string;
    brojTelefona: string;
    sviProizvodiNarudzbine: ProizvodNarudzbine[]; 
}

export class NarudzbinaP{
    statusPorudzine: Status; //req
    suma: number; //req
    potI: number;
    vremeKreiranja: Date; //req
    licnoIme: string;
    prezime: string;
    emailKup: string; 
    drzava: string;
    grad: string;
    postanskiBroj: string;
    adresa: string;
    brojTelefona: string;
    sviProizvodiNarudzbine: ProizvodNarudzbineP[]; 
}

export enum Status{
    Potvrdjeno,
    NaCekanju,
    UObradi,
    Poslato,
    Isporuceno,
    Otkazano
}