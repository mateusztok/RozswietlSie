using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RozswietlSie.Migrations
{
    /// <inheritdoc />
    public partial class admin1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "MyAdmin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "MyAdmin");
        }
    }
}
