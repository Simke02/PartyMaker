using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Nalozi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicnoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Admin = table.Column<bool>(type: "bit", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pozicija = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JMBG = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Drzava = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostanskiBroj = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nalozi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ONama",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    About = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ONama", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Proizvodi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Proizvodjac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cena = table.Column<double>(type: "float", nullable: false),
                    KratakOpis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DostupnaKolicina = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VremeDodavanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Litraza = table.Column<double>(type: "float", nullable: true),
                    Vrsta = table.Column<int>(type: "int", nullable: true),
                    ProcenatAlkohola = table.Column<double>(type: "float", nullable: true),
                    Gazirano = table.Column<bool>(type: "bit", nullable: true),
                    Ukus = table.Column<int>(type: "int", nullable: true),
                    Tip = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvodi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Narudzbine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusPorudzine = table.Column<int>(type: "int", nullable: false),
                    Suma = table.Column<double>(type: "float", nullable: false),
                    VremeKreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PotI = table.Column<int>(type: "int", nullable: false),
                    LicnoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailKup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Drzava = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostanskiBroj = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PotrosacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Narudzbine", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Narudzbine_Nalozi_PotrosacID",
                        column: x => x.PotrosacID,
                        principalTable: "Nalozi",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ProizvodNarudzbine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    UkupnaCena = table.Column<double>(type: "float", nullable: false),
                    ProizvodID = table.Column<int>(type: "int", nullable: false),
                    NarudzbinaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProizvodNarudzbine", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ProizvodNarudzbine_Narudzbine_NarudzbinaID",
                        column: x => x.NarudzbinaID,
                        principalTable: "Narudzbine",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_PotrosacID",
                table: "Narudzbine",
                column: "PotrosacID");

            migrationBuilder.CreateIndex(
                name: "IX_ProizvodNarudzbine_NarudzbinaID",
                table: "ProizvodNarudzbine",
                column: "NarudzbinaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ONama");

            migrationBuilder.DropTable(
                name: "Proizvodi");

            migrationBuilder.DropTable(
                name: "ProizvodNarudzbine");

            migrationBuilder.DropTable(
                name: "Narudzbine");

            migrationBuilder.DropTable(
                name: "Nalozi");
        }
    }
}
