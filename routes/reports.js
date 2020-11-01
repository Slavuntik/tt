const express = require('express');
const router = express.Router();
const databaseService=require('../utils/databaseService')
const docx = require('docx');
const { VerticalAlign, AlignmentType } = require('docx');
const fs=require('fs')


console.log("Reports service")


const getFieldByIndex=function(index,petData) {
    let result=null
    for (let i=0;i<petData.length;i++) {
        if (petData[i].cellIndex==index) {
            result=petData[i].cellValue
            break
        }
    }
    if (index==23) {
        if (result.indexOf("ВЛАДЕЛЕЦ")>-1) {
            return getFieldByIndex(24,petData)
        }
        else {
            if (result.indexOf("ЛИЦО")>-1) {
                return getFieldByIndex(25,petData)
            }
            else {
                return result
            }
        }
    }
    else {
        return result
    }
}

const toFieldByIndex=function (index,petData,alias) {
    let value=getFieldByIndex(index,petData)
    if (value==alias) {
        return alias.toUpperCase()+"     | X |       "
    }
    else {
        return alias.toUpperCase()+"      "+value+"     "
    }
}

router.get('/', async (req, res) => {
    const { Document, Packer, Paragraph, Table, TableCell, TableRow , AlignmentType, Media} = docx;
    let doc = new Document();

    if (req.query["petid"]) {
        let pet=await databaseService.getPetById(req.query["petid"])

        let space=new Paragraph({})

        let s1=new Paragraph({
            text:"Приложение 3",alignment:AlignmentType.RIGHT
        })
        let s2=new Paragraph({
            text:"КАРТОЧКА УЧЕТА ЖИВОТНОГО № ____",alignment:AlignmentType.CENTER
        })
        
        let s3=new Paragraph({
            text:"г. Москва                                               «___»______________20___ год.",alignment:AlignmentType.LEFT
        })

        let s4=new Paragraph({
            text:"Приют для животных по адресу: ____________________________________________________",alignment:AlignmentType.LEFT
        })
        let s5=new Paragraph({
            text:"Эксплуатирующая организация:____________________________________________________",alignment:AlignmentType.LEFT
        })

        let s6=new Paragraph({
            text:"Номер вольера:_______",alignment:AlignmentType.LEFT
        })
        
        //console.log(getFieldByIndex(999,pet.petData))

        let petImage=Media.addImage(doc,Buffer.from(getFieldByIndex(999,pet.petData),'base64'),200,200)
        

        

        let table=new Table({
            rows:[
                new TableRow({
                    children:[
                                new TableCell({
                                    children:[
                                        new Paragraph({
                                            text:"Основные сведения",alignment:AlignmentType.CENTER
                                        }),
                                        new Paragraph(
                                            petImage
                                        ),

                            ],
                            alignment:AlignmentType.CENTER
                        }),
                        
                        new TableCell({
                            children:[
                                new Paragraph({
                                    text:toFieldByIndex(1,pet.petData,"СОБАКА")+toFieldByIndex(2,pet.petData,"ВОЗРАСТ")+toFieldByIndex(3,pet.petData,"ВЕС"),
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"          КОШКА        {}           Кличка               {}",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"          Пол        {}             Порода        {}       ",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"          Окрас        {}             Шерсть        {}       ",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"          Уши        {}             Хвост        {}       ",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"          Размер        {}             Особые приметы       {}       ",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"                                                                     ",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"          Характер                                                    ",
                                    alignment:AlignmentType.LEFT
                                }),
                                new Paragraph({
                                    text:"                                                                     ",
                                    alignment:AlignmentType.LEFT
                                }),

                    ]
                        })
                    ]
                })
        
            ]
        }
        )

        doc.addSection({
            children: [s1,s2,space,s3,space,s4,s5,s6,space,table],
        });
    
    
        res.setHeader('Content-Disposition', 'attachment; filename=Pril_3.docx');

        
    }   
    else {

    let pets=await databaseService.getAllPets()

    


    let tableRows=[]
    let header=new TableRow({
        children: [
            new TableCell({
                children: [new Paragraph({text:"№ п/п",alignment:AlignmentType.CENTER})],
                verticalAlign: VerticalAlign.CENTER,
            }),
            new TableCell({
                children: [new Paragraph({text:"Карточка учета животного №",alignment:AlignmentType.CENTER})],
            }),
            new TableCell({
                children: [new Paragraph({text:"Кличка животного",alignment:AlignmentType.CENTER})],
            }),
            new TableCell({
                children: [new Paragraph({text:"Вид животного (кошка/собака",alignment:AlignmentType.CENTER})],
            }),
            new TableCell({
                children: [new Paragraph({text:"Пол животного",alignment:AlignmentType.CENTER})],
            }),
            new TableCell({
                children: [new Paragraph({text:"Идентификационная метка",alignment:AlignmentType.CENTER})],
            }),
            new TableCell({
                children: [new Paragraph({text:"Дата поступления в приют",alignment:AlignmentType.CENTER})],
            }),
        ],
    })
    let counter=0
    tableRows.push(header)
    pets.forEach((pet)=> {
        counter++
        let tableRow=new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({text:counter.toString(),alignment:AlignmentType.CENTER})],
                    verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                    children: [new Paragraph({text:getFieldByIndex(0,pet.petData),alignment:AlignmentType.CENTER})],
                }),
                new TableCell({
                    children: [new Paragraph({text:getFieldByIndex(4,pet.petData),alignment:AlignmentType.CENTER})],
                }),
                new TableCell({
                    children: [new Paragraph({text:getFieldByIndex(1,pet.petData),alignment:AlignmentType.CENTER})],
                }),
                new TableCell({
                    children: [new Paragraph({text:getFieldByIndex(5,pet.petData),alignment:AlignmentType.CENTER})],
                }),
                new TableCell({
                    children: [new Paragraph({text:getFieldByIndex(14,pet.petData),alignment:AlignmentType.CENTER})],
                }),
                new TableCell({
                    children: [new Paragraph({text:getFieldByIndex(23,pet.petData),alignment:AlignmentType.CENTER})],
                }),
            ],
        })
        tableRows.push(tableRow)
    })
    


    let table = new Table({
        rows: tableRows
    });
    let s1=new Paragraph({
        text:"Приложение 4",alignment:AlignmentType.RIGHT
    })
    let s2=new Paragraph({
        text:"РЕЕСТР ЖИВОТНЫХ",alignment:AlignmentType.CENTER
    })
    let s3=new Paragraph({
        text:"г. Москва                                                          «___»______________20___ год.",alignment:AlignmentType.LEFT
    })
    let s4=new Paragraph({
        text:"Приют для животных по адресу: ________________________________________",alignment:AlignmentType.LEFT
    })
    let s5=new Paragraph({
        text:"Эксплуатирующая организация:_________________________________________",alignment:AlignmentType.LEFT
    })
    let s6=new Paragraph({})




    doc.addSection({
        children: [s1,s6,s2,s6,s3,s4,s5,s6,table],
    });
    res.setHeader('Content-Disposition', 'attachment; filename=Pril_4.docx');

    }

    let b64string = await Packer.toBase64String(doc);
    
    res.send(Buffer.from(b64string, 'base64'));  
    console.log("report created")  
})


module.exports = router