<?php include("../back/php/index.php"); ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/php.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz</title>
    </head>
    <body>
        <form method="post" action="">
            <?php if ($preguntaActual): ?>
                <p><?php echo htmlspecialchars($preguntaActual['pregunta']); ?></p>

                <?php if (!empty($preguntaActual['imatge'])): ?>
                    <img src="<?php echo htmlspecialchars($preguntaActual['imatge']); ?>" height="100px" />
                <?php endif; ?>

                <?php
                    $respostes = array_merge([$preguntaActual['resposta_correcta']], $preguntaActual['respostes_incorrectes']);
                    shuffle($respostes);

                    foreach ($respostes as $resposta): ?>
                        <div class="buttons">
                            <button type="submit" name="resposta" value="<?php echo htmlspecialchars($resposta); ?>"><?php echo htmlspecialchars($resposta); ?></button>
                        </div>
                    <?php endforeach; ?>
                <input type="hidden" name="index" value="<?php echo htmlspecialchars($preguntaActualIn); ?>">
            <?php else: ?>
                <p>El quiz ha terminado. <a href="?reset=1">Reiniciar juego</a></p>
            <?php endif; ?>
        </form>
    </body>
</html>