namespace Models;

public enum Ukus
{
    Jabuka,
    Narandža,
    Limunada,
    Grejpfrut,
    Breskva,
    Kruška,
    Ananas,
    Manga,
    Borovnica,
    Malina,
    Brusnica,
    Višnja,
    Grožđe,
    Kajsija,
    Šljiva,
    Lubenica,
    Limeta,
    Cola
}

public class BezalkoholnoPice : Pice
{
    public required bool Gazirano{get; set;}
    public required Ukus Ukus{get; set;}
}