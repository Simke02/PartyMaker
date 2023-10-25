using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class AboutUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "About",
                table: "ONama",
                newName: "parag3");

            migrationBuilder.AddColumn<string>(
                name: "image1",
                table: "ONama",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "image2",
                table: "ONama",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "image3",
                table: "ONama",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "parag1",
                table: "ONama",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "parag2",
                table: "ONama",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image1",
                table: "ONama");

            migrationBuilder.DropColumn(
                name: "image2",
                table: "ONama");

            migrationBuilder.DropColumn(
                name: "image3",
                table: "ONama");

            migrationBuilder.DropColumn(
                name: "parag1",
                table: "ONama");

            migrationBuilder.DropColumn(
                name: "parag2",
                table: "ONama");

            migrationBuilder.RenameColumn(
                name: "parag3",
                table: "ONama",
                newName: "About");
        }
    }
}
