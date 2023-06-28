using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApi.Migrations
{
    /// <inheritdoc />
    public partial class preports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalHoursWorked",
                table: "users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalNumberOfLeaveDays",
                table: "users",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "performances",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 28, 6, 16, 15, 770, DateTimeKind.Local).AddTicks(5654),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 27, 20, 52, 33, 897, DateTimeKind.Local).AddTicks(6871));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalHoursWorked",
                table: "users");

            migrationBuilder.DropColumn(
                name: "TotalNumberOfLeaveDays",
                table: "users");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "performances",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 27, 20, 52, 33, 897, DateTimeKind.Local).AddTicks(6871),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 28, 6, 16, 15, 770, DateTimeKind.Local).AddTicks(5654));
        }
    }
}
