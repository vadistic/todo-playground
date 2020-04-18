fn main() {
    print_hello();

    for i in 0..5 {
        if i % 2 == 0 {
            println!("even {}", i);
        } else {
            println!("odd {}", i);
        }

        println!("plus two is  {}", add_two(i))
    }
}

fn add_two(val: i32) -> i32 {
    return val + 2;
}
