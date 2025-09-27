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
                        <td class="body-text-wrapper"><button>Select</button></td>
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