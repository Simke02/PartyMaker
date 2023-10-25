namespace Models;

public enum VrstaAlkohola
{
    Pivo,
    BeloVino,
    CrnoVino,
    Roze,
    Viski,
    Votka,
    Sampanjac,
    Dzin,
    Konjak,
    Burbon,
    Tekila,
    Liker,
    Rum,
    Vinjak,
    Razno
}
public class AlkoholnoPice : Pice
{
    public required VrstaAlkohola Vrsta{get; set;}
    public required double ProcenatAlkohola{get; set;}

}