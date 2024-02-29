const express=require('express');
const employees=require('./employees');
const path=require('path');
const app=express();
const idFilter = req => member => member.id === parseInt(req.params.id);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
const PORT=3002;
app.listen(PORT, () => console.log(`Server is Running ${PORT}`));
app.get('/api/employees',(req,res)=>res.json(employees));
//GET SPECIFIC USER BASED ON ID
app.get('/api/employees/:id',(req,res)=>{
    const found=employees.some(idFilter(req));
    if(found){
        res.json(employees.filter(idFilter(req)));
    }else{
        res.status(400).json({msg:'No member with the id of ${req.params.id}'});
    }
});
//CREATE A NEW USER
app.post('/api/employees',(req,res)=>{
    const newMember={
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        department:req.body.department,
        experience:req.body.experience,
        designation:req.body.designation
    };
    if(!newMember.name || !newMember.email ){
    return res.status(400).json({msg:'NAME and EMAIL Must be provided'});
    }
    employees.push(newMember);
    res.json(employees);
});
//DELETE Specific USER Based on ID
app.delete('/api/employees/:id', (req, res) => {
    const found = employees.some(idFilter(req));
    if (found) {
      res.json({msg:'Deleted',
      members:employees.filter(
      member=>member.id!==parseInt(req.params.id))})
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});
//UPDATE Specific USER Based on ID
app.put('/api/employees/:id',(req,res)=>
{
  const found =employees.some(member=>member.id===parseInt(req.params.id));
  if(found)
  {
    const updMember=req.body;
    employees.forEach(
    member=>{
        if(member.id===parseInt(req.params.id))
        {
            member.name=updMember.name ? updMember.name : member.name;
            member.email=updMember.email ? updMember.email : member.email;
            member.department=updMember.department ? updMember.department : member.department;
            member.designation=updMember.designation ? updMember.designation: member.designation;
            member.experience=updMember.experience ? updMember.experience : member.experience;
            res.json({msg:'Updated Details',member})
        }
    });
    }
    else{
        res.status(400).json({msg:'No User found with ${req.params.id}'});
    }
});

