<?php
require_once("utils/dataconnector.php");
if ($fiberartists = $fiberdb->query("SELECT * from fiberartists"))  { 
  while ($fiberartistname = $fiberartists->fetch_object())
  { 
   $fiberarray[$fiberartistname->idfiberartist] = $fiberartistname; 
   
//*********************************************    
    if ($fibergalleries = $fiberdb->query("select idfibergallery , galleryname from fibergalleries where fiberartistid_fibergalleryid = ".$fiberartistname->idfiberartist)) {
	   while ($galleryname = $fibergalleries->fetch_object())
   {
	   $fiberarray[$fiberartistname->idfiberartist]->fibergalleries[$galleryname->idfibergallery] = $galleryname;
		   
//******************************************************		   
		   if ($fiberartworks = $fiberdb->query("select idfiberartwork , fibertitle from fiberartworks where fiberartworkid_fibergalleryid = ".$galleryname->idfibergallery)) {
			   while ($fibertitle = $fiberartworks->fetch_object())
			   {
				   $fiberarray[$fiberartistname->idfiberartist]->fibergalleries[$galleryname->idfibergallery]->fiberartworks[$fibertitle->idfiberartwork] = $fibertitle;
				   
//**************************************				   
				  					   
			   }
			   $fiberartworks->close();		   
		   }	   
	   }
	   $fibergalleries->close();
   }
   
//***************************   
} 
    
  $fiberartists->close();
  
}; 
$fiberdb->close(); 
require_once('utils/JSON.php');
$json = new Services_JSON;
$fiberdata = $json->encode($fiberarray);
echo $fiberdata;
?>