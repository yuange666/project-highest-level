export const permission=(el,binding)=>{
    const roleList=sessionStorage.getItem('role')?JSON.parse(sessionStorage.getItem('role')):[];
    const hasPermission=roleList.some((e)=>{
        return binding.value.includes(e);
    });
    if(!hasPermission){
        el.style.display='none';
    }
}