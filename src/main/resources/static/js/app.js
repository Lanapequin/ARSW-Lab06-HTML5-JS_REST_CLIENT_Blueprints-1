var app = (function() {
    var author = '';
    var blueprints = [];

    function setAuthor(newAuthor) {
        author = newAuthor;
    }

    function updateBlueprints(authorName) {
        setAuthor(authorName);
        apimock.getBlueprintsByAuthor(author, function (data) {
            blueprints = data.map(function (bp) {
                return {
                    name: bp.name,
                    points: bp.points.length
                };
            });

            $("#blueprints-table tbody").empty();

            blueprints.map(function (bp) {
                $("#blueprints-table tbody").append(
                    `<tr>
                        <td>${bp.name}</td>
                        <td>${bp.points}</td>
                        <td><button>Select</button></td>
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

    return {
        updateBlueprints: updateBlueprints
    };
})();