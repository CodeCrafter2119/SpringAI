package com.SpringAIDemo.demoAI.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat/{model}")
public class Controller {

	private ChatClient client;
	
	public Controller(OllamaChatModel chatclient) {
		this.client = ChatClient.create(chatclient);
	}
	
	@GetMapping("/{message}")
	public ResponseEntity<String> ChatWithAi(@PathVariable String message) {
		
		String response= client.prompt(message).call().content();
		
		return ResponseEntity.ok(response);
	}
}
