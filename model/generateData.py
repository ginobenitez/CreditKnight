
def generate_bank_data(num_records=1000):
    data = {
        'account_id': np.random.randint(1000, 9999, num_records),
        'user_id': np.random.randint(1, 100, num_records),
        'transaction_id': np.random.randint(1000000, 9999999, num_records),
        'transaction_amount': np.round(np.random.uniform(10, 2000, num_records), 2),
        'transaction_time': [fake.date_time_this_year() for _ in range(num_records)],
        'merchant_category': np.random.choice(['groceries', 'electronics', 'clothing', 'dining'], num_records),
        'location': [fake.city() for _ in range(num_records)],
        'device_id': [fake.uuid4() for _ in range(num_records)],
        'ip_address': [fake.ipv4() for _ in range(num_records)],
        'is_fraud': np.random.choice([0, 1], p=[0.97, 0.03], size=num_records)  # 3% fraud
    }
    return pd.DataFrame(data)

bank_data.to_csv('fake_bank_data.csv', index=False)

fake = Faker()
X = bank_data.drop(columns=['is_fraud'])  # Features
y = bank_data['is_fraud']                 # Labels
predictions = model.predict(X)
