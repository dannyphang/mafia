# mafia

^: Matches the start of the input.
(https?:\/\/)?: Matches an optional "http://" or "https://". The s? makes the "s" optional, and :\/\/ matches the "://".
([^\s/$.?#].[^\s]*): Matches the main part of the URL. It looks for any character that is not a whitespace character, "/", "$", ".", "?", or "#". The * allows for zero or more of these characters.
$/i: Matches the end of the input and is case-insensitive (the i flag).
