from faker import Faker
fake = Faker()
X = bank_data.drop(columns=['is_fraud'])  # Features
y = bank_data['is_fraud']                 # Labels
predictions = model.predict(X)