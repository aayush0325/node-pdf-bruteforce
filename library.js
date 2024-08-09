const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');
const api = new ILovePDFApi('project_public_3131ea4a568f1f10d91849d0cc239853_f_UCCdbf48790b606b845afd163fe1134dc83', 'project_public_3131ea4a568f1f10d91849d0cc239853_f_UCCdbf48790b606b845afd163fe1134dc83');
const ilovepdf = new ILovePDFApi('project_public_3131ea4a568f1f10d91849d0cc239853_f_UCCdbf48790b606b845afd163fe1134dc83')
const task = ilovepdf.newTask('unlock');

task.start()
.then(() => {
    return task.addFile('path/to/file1_name.pdf');
})
.then(() => {
    return task.process();
})
.then(() => {
    return task.download();
})
.then((data) => {
    fs.writeFileSync('./Tutorial_2_119.pdf', data);
});