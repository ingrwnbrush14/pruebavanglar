<template>
  <div class="graphic">
      <button @click="loadData">Cargar Datos</button> <br>
      <canvas id="chartcanvas" width="300" height="500">
      </canvas>
  </div>
</template>

<script>
import firebase from 'firebase';
import Chart from 'chart.js';

export default {
    name: 'graphic',
    data(){
        return {
            questions: new Array(),
        }
    },
    mounted: function() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            var db = firebase.database();
            var refQuestion = db.ref("/answers");
            var answ = []; // Lista donde almaceno los contadores por pregunta
            var totalT = 0; // Total de respuestas correctas
            var totalF = 0; // Total de respuestas incorrectas

            // Obtenemos todas las answers de la BD
            refQuestion.on("value", (answers) => {
                if(answers != null)
                {
                    // Por cada respuesta en la BD
                    answers.forEach(a => {
                        var val = a.val(); // Obtenemos el valor

                        // Buscamos si ya tenemos contador de esa pregunta
                        var question = answ.find(q => q.id == val.questionId)
                        
                        // Creamos objeto de la pregunta si no existe
                        if(question == null || question == undefined)
                        {
                            question = {id: val.questionId, contT: 0, contF: 0};
                            answ.push(question);
                        }

                        // Acumulamos la respuesta si es correcta
                        if(val.right)
                        {
                             question.contT++;
                             totalT++;
                        }
                        else
                        {
                            question.contF++;
                            totalF++;
                        }
                    })


                }
            })
            console.log(answ.sort((x,y) => x.id>y.id?1:-1)); // Mostramos los datos ordenados por el id de pregunta
            console.log("Total F: " + totalF);
            console.log("Total T: " + totalT);
            console.log("Total: " + (totalT + totalF));

            // Datos para la grafica
            var labels = [];
            var dataT = [];
            var dataF = [];

            answ.forEach(a => {
                labels.push(a.id);
                dataT.push(a.contT);
                dataF.push(a.contF);
            })

            var datasets = {
                labels : labels,
                datasets: [
                    {
                        barPercentage: 1,
                        categoryPercentage: 1,
                        label: 'Aciertos',
                        data: dataT,
                        backgroundColor: 'rgba(54,73,93,.5)',
                    },
                    {
                        barPercentage: 1,
                        categoryPercentage: 1,
                        label: 'Errores',
                        data: dataF,
                        backgroundColor: 'rgba(71, 183,132,.5)',
                    }
                    
                    
                ]
            }

            // Creamos grafica
            this.createChart("chartcanvas", {
                type: 'horizontalBar',
                data: datasets,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Preguntas Correctas/Incorrectas'
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display:true,
                                labelString: 'Acierto/Errores'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display:true,
                                labelString: 'Pregunta'
                            }
                        }]
                    }
                }
            })

        },
        createChart: function (cId, cData) {
            const ctx = document.getElementById(cId).getContext('2d');
            new Chart(ctx, {
                type: cData.type,
                data: cData.data,
                options: cData.data,
            });
        } 
    }

}
</script>

<style>

</style>