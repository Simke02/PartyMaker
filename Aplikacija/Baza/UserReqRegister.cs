namespace Aplikacija;

public class UserReqRegister
{
    public string email {get; set; } = string.Empty;
    public string password {get; set; } = string.Empty;
    public string LicnoIme{get; set;}
    public string Prezime{get; set;}
    public bool Admin {get; set;} = false;
    public string Adresa { get; set; }
    public string BrojTelefona { get; set; }
    public required string Grad{get; set;}
    public required string Drzava{get; set;}
    public required string PostanskiBroj{get; set;}

}