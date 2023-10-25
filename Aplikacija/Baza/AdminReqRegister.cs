namespace Aplikacija;

public class AdminReqRegister
{
    public string email {get; set; } = string.Empty;

    public string password {get; set; } = string.Empty;

    public string LicnoIme{get; set;}
    
    public string Prezime{get; set;}

    public bool Admin {get; set;} = true;

    public string Pozicija { get; set; }

    public string JMBG { get; set; }


}