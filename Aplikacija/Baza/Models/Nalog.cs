namespace Models;

public class Nalog
{
    [Key]
    public int ID {get; set;}
    public required string password {get; set;}
    public required string email {get; set;}
    public required string LicnoIme{get; set;}
    public required string Prezime{get; set;}

    public required bool Admin {get; set;}
}