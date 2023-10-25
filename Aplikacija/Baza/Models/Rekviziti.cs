namespace Models;

public enum TipRekvizita
{
    Baloni,
    Pinjate,
    Ketering,
    Dekor,
    Kostimi,
    Razno
}

public class Rekviziti : Proizvod
{
    public required TipRekvizita Tip{get; set;}
}