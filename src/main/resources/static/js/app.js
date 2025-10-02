var app = (function() {
    var author = '';
    var blueprints = [];

    function setAuthor(newAuthor) {
        author = newAuthor;
    }

    function updateBlueprints(authorName) {
        setAuthor(authorName);
        apimock.getBlueprintsByAuthor(author, function (data) {
            if (!data || data.length === 0) {
                $("#user-message").text(`No blueprints found for "${author}".`);
                $(".message").show();
                $(".left-panel").hide();
                $(".right-panel").hide();
                return;
            }

            blueprints = data.map(function (bp) {
                return {
                    name: bp.name,
                    points: bp.points.length
                };
            });

            $(".message").hide();
            $(".left-panel").show();
            $(".right-panel").show();
            $("#searchQuery").val('');

            $("#blueprints-table tbody").empty();

            blueprints.map(function (bp) {
                $("#blueprints-table tbody").append(
                    `<tr>
                        <td class="body-text-wrapper">${bp.name}</td>
                        <td class="body-text-wrapper">${bp.points}</td>
                        <td class="body-text-wrapper">
                            <button onclick="app.drawBlueprint('${author}', '${bp.name}')">Select</button>
                        </td>
                     </tr>`
                )
            })

            var totalPoints = blueprints.reduce(function (acc, bp) {
                return acc + bp.points;
            }, 0);

            $("#authorName").text(`${author}'s Blueprints: `);
            $("#totalPoints").text(`Total user points: ${totalPoints}`);
        });
    }

    function drawBlueprint(authorName, blueprintName) {
        apimock.getBlueprintsByNameAndAuthor(authorName, blueprintName, function (blueprint) {
            if (!blueprint) {
                alert("Blueprint not found");
                return;
            }

            // actualizar el nombre en el DOM
            $("#currentBlueprintName").text("Current blueprint: " + blueprint.name);

            // obtener el canvas y limpiar lo anterior
            var canvas = document.getElementById("blueprintCanvas");
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // dibujar líneas entre puntos
            var points = blueprint.points;
            if (points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (var i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
    }

    return {
        updateBlueprints: updateBlueprints,
        drawBlueprint: drawBlueprint
    };
})();