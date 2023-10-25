namespace Models;

public class Potrosac : Nalog
{
    public required string Adresa{get; set;}
    public required string Grad{get; set;}
    public required string Drzava{get; set;}
    public required string BrojTelefona{get; set;}
    public required string PostanskiBroj{get; set;}
    [JsonIgnore]
    public List<Narudzbina> Narudzbine{get; set;}=null!;
}