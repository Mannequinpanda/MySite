create table contactLog (
  log_id INTEGER NOT NULL AUTO_INCREMENT,
   title text,
   email VARCHAR(256),
   username VARCHAR(256),
   link text,
   category VARCHAR(12),
   msg text,
   Primary key (log_id)
);

insert into contactLog (title, email, username, link, category, msg)
values ("testTitle", "test@t.com", "testUser", "test.com", "Question", "How u?");