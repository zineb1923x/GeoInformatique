package com.sadaqah.sadaqah.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sadaqah.sadaqah.repo.IUtilisateur;
import com.sadaqah.sadaqah.model.Utilisateur;

@Service
public class UtilisateurService {
	
	@Autowired
	private IUtilisateur utilisateurRepo; 
	
	public List<Utilisateur> getUtilisateurs(){
		
		return utilisateurRepo.findAll();
		
	}
	
	public boolean addUtilisateur(Utilisateur utilisateur) {
		boolean result=true;
		try {
			utilisateurRepo.save(utilisateur);
			
		}
		catch(Exception e) {
			result =false;
		}
		
		return result; 	
	}
	
	public Long connect(String userName, String passWord) {
		Long result =(long) 0;
		try {
			List<Utilisateur> utilisateurs=utilisateurRepo.findAll(); 
			
			for(int i=0;i<utilisateurs.size();i++) {
				
				if (utilisateurs.get(i).getUserName().equals(userName) && utilisateurs.get(i).getUserName()!=null ) {
					result= utilisateurs.get(i).getId();
				}
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		
		return result;
		
		
		
		
		
		
	}
	
	

}
