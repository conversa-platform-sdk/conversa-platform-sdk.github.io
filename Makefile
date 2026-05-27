.PHONY: verify test install clean

verify:
	@echo "Verifying Conversa workspace..."
	@node verify.js

test: verify
	@echo "All checks passed."

install:
	npm install

clean:
	rm -rf node_modules
