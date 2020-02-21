<template>
  <div class="graphic">
      <button @click="loadData">Cargar Datos</button>
      <p>Message: {{databasedata}}</p>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'graphic',
    data(){
        return {
            questions: new Array(),
        }
    },
    methods: {
        loadData: function () {
            var db = firebase.database();
            var refQuestion = db.ref("/answers");
            var answ = [];
            var totalT = 0;
            var totalF = 0;
            refQuestion.on("value", (answers) => {
                if(answers != null)
                {
                    answers.forEach(a => {
                        var val = a.val();

                        // Buscamos si ya tenemos contador de esa pregunta
                        var question = answ.find(q => q.id == val.questionId)
                        
                        // Creamos objeto de la pregunta si no existe
                        if(question == null || question == undefined)
                        {
                            question = {id: val.questionId, true: 0, false: 0};
                            answ.push(question);
                        }

                        // Acumulamos la respuesta si es correcta
                        if(val.right)
                        {
                             question.true++;
                             totalT++;
                        }
                        else
                        {
                            question.false++;
                            totalF++;
                        }
                    })


                }
            })
            console.log(answ.sort((x,y) => x.id>y.id?1:-1));
            console.log("Total F: " + totalF);
            console.log("Total T: " + totalT);
            console.log("Total: " + (totalT + totalF));
        }   
    }

}
</script>

<style>

</style>