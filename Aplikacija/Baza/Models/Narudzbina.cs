namespace Models;
public enum Status{
    Potvrdjeno=0,
    NaCekanju,
    UObradi,
    Poslato,
    Isporuceno,
    Otkazano
}

public class Narudzbina
{
    [Key]
    public int ID {get; set;}
    public required Status StatusPorudzine{get; set;}
    public required double Suma{get; set;}
    public required DateTime VremeKreiranja{get; set;}
    public int PotI{get; set;} //Roka i PotrosacID
    public string LicnoIme{get; set;}
    public string Prezime{get; set;}
    public string EmailKup {get; set;}
    public string Drzava{get; set;}
    public string Grad{get; set;}
    public string PostanskiBroj{get; set;}
    public string Adresa{get; set;}
    public string BrojTelefona{get; set;}
    public List<ProizvodNarudzbine> SviProizvodiNarudzbine{get; set;}=null!;
}