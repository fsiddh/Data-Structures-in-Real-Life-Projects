#include <iostream>
#include <set>
#include <map>

using namespace std;

int main(){
    int no_of_transactions, friends;
    cin >> no_of_transactions >> friends;

    string x,y;
    int amount;

    map<string, int>net;

    int onot = no_of_transactions;
    while (no_of_transactions--){
        cin >> x >> y >> amount;

        if (net.count(x) == 0){
            net[x] = 0;
        }

        if (net.count(y) == 0){
            net[y] = 0;
        }

        net[x] -= amount;
        net[y] += amount;
    }

    multiset< pair<int, string> > m;
    for (auto p: net){
        string person = p.first;
        int amount = p.second;

        if (net[person] != 0){
            m.insert( make_pair(amount, person) );
        }
    }

    int count = 0;
    while(!m.empty()){
        auto low = m.begin();
        auto high = prev( m.end() );

        int debit = low->first;
        string debit_person = low->second;

        int credit = high->first;
        string credit_person = high->second;

        m.erase(low);
        m.erase(high);

        int settlement_amount = min(-debit, credit);
        debit += settlement_amount;
        credit -= settlement_amount;

        cout << debit_person << " will pay " << settlement_amount << " to " << credit_person << endl;

        if (debit != 0){
            m.insert( make_pair(debit, debit_person) );
        }

        if (credit != 0){
            m.insert( make_pair(credit, credit_person) );
        }

        count += 1;
    }
    cout << endl;
    cout << "Without Algorithm it took: " << onot << " transacions" << endl;
    cout << "With Algorithm it took: " << count << " transacions";
    cout << endl;

}
